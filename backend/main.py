"""
FastAPI app for the ai4ea backend.

Does one thing: accept generation requests from the frontend, build a
prompt, ask the llm, run output checks, and return the response.

Run locally:
    uvicorn main:app --port 3001 --reload

Needs: LITELLM_API_KEY or GITHUB_TOKEN env var set (or any value for ollama).
"""

import logging
import os
import re
from collections import Counter

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from github_pr import REPO as GITHUB_REPO, GitHubError, open_pr
from llm_client import LLMError, generate
from output_check import check_output
from retrieval import EngineContext, assemble_prompt, load_context

logger = logging.getLogger("ai4ea")
logging.basicConfig(level=logging.INFO, format="%(message)s")

app = FastAPI(title="AI4EA backend", version="0.1.0")

# wildcard cors is fine for local dev since the frontend runs on a
# different port. would tighten this up for the gcp deployment.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "OPTIONS", "GET"],
    allow_headers=["*"],
)

# we load the kb ONCE at startup so requests don't re-read files from
# disk. for our small kb that's just a few mb in memory.
_context: EngineContext | None = None


@app.on_event("startup")
def _startup() -> None:
    """load the knowledge base into memory when the server starts."""
    global _context
    logger.info("loading knowledge base...")
    _context = load_context()
    logger.info("knowledge base ready.")


class GenerateRequest(BaseModel):
    """what the frontend posts to /generate."""
    scenario: str = Field(min_length=1)


class RetrievedDoc(BaseModel):
    path: str
    score: float


class ChecksResponse(BaseModel):
    """camelCase on purpose to match what the frontend expects."""
    missingSections: list[str]
    citedSources: list[str]
    invalidSources: list[str]


class GenerateResponse(BaseModel):
    """what /generate returns. the frontend uses retrieved + keywords to
    render the 'engine consulted' panel, and checks to render the audit
    banner."""
    pattern: str
    mode: str
    retrieved: list[RetrievedDoc]
    keywords: list[str]
    checks: ChecksResponse


@app.get("/health")
def health() -> dict:
    """basic liveness check for cloud run."""
    return {"status": "ok"}


@app.post("/generate", response_model=GenerateResponse)
def do_generate(req: GenerateRequest) -> GenerateResponse:
    """handle one generation request end-to-end: build a prompt, call the
    llm, run checks, return everything."""

    if _context is None:
        # shouldn't happen because startup loads the kb, but check anyway.
        raise HTTPException(status_code=503, detail="knowledge base not ready")

    scenario = req.scenario.strip()

    # build the prompt: figure out the mode, grep for relevant docs, glue
    # everything together into the llm input.
    assembled = assemble_prompt(_context, scenario)

    # log what we're about to do. helps with debugging and gives us a
    # record of what got retrieved for each request.
    kw_preview = ", ".join(assembled.keywords[:8])
    if len(assembled.keywords) > 8:
        kw_preview += ", ..."
    retrieved_str = (
        ", ".join(f"{p}({s})" for p, s in assembled.retrieved)
        if assembled.retrieved
        else "(none)"
    )
    logger.info(
        f"[generate] mode={assembled.mode} keywords=[{kw_preview}] "
        f"retrieved={retrieved_str}"
    )

    # call the llm. this is the slow part, can take seconds.
    try:
        pattern = generate(assembled.system_prompt, assembled.user_prompt)
    except LLMError as exc:
        logger.error(f"generation error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    # run checks on what the llm gave back. doesn't change the answer,
    # just flags problems.
    checks = check_output(_context, assembled, pattern)

    if checks.missing_sections or checks.invalid_sources:
        logger.warning(
            f"[checks] missingSections=[{', '.join(checks.missing_sections)}] "
            f"invalidSources=[{', '.join(checks.invalid_sources)}]"
        )

    return GenerateResponse(
        pattern=pattern,
        mode=assembled.mode,
        retrieved=[RetrievedDoc(path=p, score=s) for p, s in assembled.retrieved],
        keywords=assembled.keywords,
        checks=ChecksResponse(
            missingSections=checks.missing_sections,
            citedSources=checks.cited_sources,
            invalidSources=checks.invalid_sources,
        ),
    )


# ---------------------------------------------------------------------------
# PR-to-KB workflow: upload a .md, open a PR into the KB repo
# ---------------------------------------------------------------------------
# Path prefix inside the target repo. For SammyBolger/priv the KB lives at
# frontend/docs. For a native ai4ea repo (no monorepo wrapper) it would be
# just "docs". Override via KB_PATH_PREFIX env var.
KB_PATH_PREFIX = os.environ.get("KB_PATH_PREFIX", "frontend/docs")

# Fallback category if retrieval finds nothing pattern-shaped. Pick something
# generic-ish that the reviewer will likely re-route anyway.
DEFAULT_CATEGORY = "application"


def _slugify(text: str) -> str:
    """turn a title into a filename-safe slug."""
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def _extract_h1(content: str) -> str | None:
    """pull the first H1 heading from a markdown body. returns None if none."""
    m = re.search(r"^# (.+)$", content, re.MULTILINE)
    return m.group(1).strip() if m else None


def _derive_description(content: str) -> str:
    """
    guess a one-line kb description from the doc content. same logic as the
    backfill script: pull the first sentence under "### Purpose of Document"
    if present, otherwise fall back to the H1. keeps the kb table row
    consistent even when the uploader doesn't type a description.
    """
    m = re.search(
        r"###\s+Purpose of Document\s*\n\s*\n(.+?)(?:\n\s*\n|\n#)",
        content, re.DOTALL,
    )
    if m:
        raw = m.group(1).strip()
        raw = re.sub(r"\*\*", "", raw)
        raw = re.sub(r"`+", "", raw)
        raw = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", raw)
        return re.split(r"(?<=\.)\s+", raw)[0].strip()[:200]
    h1 = _extract_h1(content)
    return h1 or "Reference architecture pattern."


def _suggest_category(content: str) -> tuple[str, list[tuple[str, float]]]:
    """
    guess the target sub-folder for a manually uploaded pattern doc.

    same idea as pattern-mode retrieval: run bm25 over the topical pool
    treating the doc content as the "scenario", then take the majority
    vote of the sub-folder among the top hits. we prefix with a fake
    [MODE: PATTERN GENERATION] tag so the mode detector picks the right
    quotas.
    """
    if _context is None:
        return DEFAULT_CATEGORY, []

    # first 800 chars is usually enough context to route (H1 + intro).
    # avoids dragging the whole 300-line pattern doc through retrieval.
    fake_scenario = f"[MODE: PATTERN GENERATION] {content[:800]}"
    assembled = assemble_prompt(_context, fake_scenario)

    folders: list[str] = []
    for path, _ in assembled.retrieved:
        parts = path.split("/")
        if len(parts) >= 2 and parts[0] == "patterns":
            folders.append(parts[1])

    if not folders:
        return DEFAULT_CATEGORY, assembled.retrieved
    top = Counter(folders).most_common(1)[0][0]
    return top, assembled.retrieved


class SuggestResponse(BaseModel):
    """what /suggest-pr-target returns after inspecting an uploaded file."""
    category: str
    filename: str
    pr_title: str
    kb_description: str
    retrieved: list[RetrievedDoc]


@app.post("/suggest-pr-target", response_model=SuggestResponse)
async def suggest_pr_target(file: UploadFile = File(...)) -> SuggestResponse:
    """for an uploaded .md, suggest a target sub-folder, filename, and a
    one-line kb description the uploader can edit before opening the PR."""
    raw = await file.read()
    try:
        content = raw.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="file must be utf-8 markdown")

    if not content.strip():
        raise HTTPException(status_code=400, detail="file is empty")

    h1 = _extract_h1(content)
    fallback = (file.filename or "").removesuffix(".md") or "new-pattern"
    slug = _slugify(h1) if h1 else _slugify(fallback)

    category, retrieved = _suggest_category(content)
    title = h1 or fallback.replace("-", " ").title()

    return SuggestResponse(
        category=category,
        filename=f"{slug}.md",
        pr_title=f"Add pattern: {title}",
        kb_description=_derive_description(content),
        retrieved=[RetrievedDoc(path=p, score=s) for p, s in retrieved],
    )


class SubmitResponse(BaseModel):
    """what /submit-for-review returns after opening the PR."""
    pr_url: str
    branch: str
    path: str
    repo: str


@app.post("/submit-for-review", response_model=SubmitResponse)
async def submit_for_review(
    file: UploadFile = File(...),
    category: str = Form(...),
    filename: str = Form(...),
    pr_title: str = Form(...),
    pr_description: str = Form(""),
    kb_description: str = Form(""),
) -> SubmitResponse:
    """upload a .md, open a PR into the KB repo at the chosen sub-folder.
    If kb_description is provided AND the file has no existing frontmatter,
    we prepend a description frontmatter so the KB table row renders a
    description instead of an empty cell."""

    # basic input sanity - reject obvious traversal / bad names before we
    # let them shape a git path.
    if not filename.endswith(".md"):
        raise HTTPException(status_code=400, detail="filename must end with .md")
    if "/" in filename or "\\" in filename or filename.startswith("."):
        raise HTTPException(status_code=400, detail="filename cannot contain path parts")
    if not re.fullmatch(r"[a-z0-9-]+", category):
        raise HTTPException(status_code=400, detail="category must be a slug (lowercase letters, digits, hyphens)")

    raw = await file.read()
    try:
        content = raw.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="file must be utf-8 markdown")

    # add description frontmatter unless the file already has its own
    # frontmatter (in which case we leave it alone so we don't clobber
    # anything the author put there deliberately).
    desc = kb_description.strip()
    if desc and not content.startswith("---"):
        safe = desc.replace('"', "'")
        content = f'---\ndescription: "{safe}"\n---\n\n{content}'

    slug_only = filename.removesuffix(".md")
    file_path = f"{KB_PATH_PREFIX}/patterns/{category}/{filename}"
    branch = f"generated/patterns/{category}/{slug_only}"

    logger.info(f"[submit-for-review] opening pr in {GITHUB_REPO} for {file_path}")

    try:
        pr_url = open_pr(
            file_path=file_path,
            file_content=content,
            branch=branch,
            pr_title=pr_title,
            pr_body=pr_description,
        )
    except GitHubError as exc:
        logger.error(f"github pr failed: {exc}")
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    logger.info(f"[submit-for-review] opened {pr_url}")
    return SubmitResponse(
        pr_url=pr_url,
        branch=branch,
        path=file_path,
        repo=GITHUB_REPO,
    )
