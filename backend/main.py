"""
FastAPI app for the ai4ea backend.

Does one thing: accept generation requests from the frontend, build a
prompt, ask the llm, run output checks, and return the response.

Run locally:
    uvicorn main:app --port 3001 --reload

Needs: LITELLM_API_KEY or GITHUB_TOKEN env var set (or any value for ollama).
"""

import logging

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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
