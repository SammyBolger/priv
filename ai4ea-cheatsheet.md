# AI4EA Interview Cheat Sheet

*Format: hand-copy this into your notebook. The compression forces retention.
Bold phrases = memorize verbatim. Everything else = your own paraphrase.*

---

## 1. Elevator pitch (60 seconds, memorize)

I built **AI4EA**, an AI-powered assistant that helps Entegris architects draft
**reference architectures** in minutes instead of days. An architect describes
a business scenario in plain English. The engine **retrieves relevant docs
from the Entegris knowledge base using BM25 with per-mode category quotas**,
feeds them to a **Gemini LLM through a mode-specific system prompt**, and
returns a **full pattern document with cited sources**. The full workflow
ends with a **one-click PR to the KB repo**, where the backend uses GitHub's
API to open a real pull request for an architect to review. It's a **RAG
system with a Python FastAPI backend and a Docusaurus frontend**, targeting
**GCP Cloud Run behind IAP with Vertex AI** for production, with a public
demo build on GitHub Pages.

---

## 2. What it is (bullet form)

- **Problem:** Entegris architects spend days manually assembling reference
  architecture patterns from scattered docs. AI4EA compresses that to minutes.
- **Users:** Solution architects, security engineers, ARB/TRB reviewers.
- **Three modes:**
  1. **Pattern Generation** scenario in, full pattern doc out
  2. **Assurance Review** proposed design in, compliance assessment out
  3. **Question** freeform Q&A grounded in the KB
- **Human-in-the-loop:** the AI drafts, an architect reviews before publish.
  The PR workflow enforces this by routing every generated pattern through
  GitHub review before it lands in the KB.

---

## 3. End-to-end workflow

**Path A: generate in-app**

1. Architect opens the app, signs in with Entegris SSO via IAP
2. Picks a mode on `/generate`, types a scenario
3. Backend does retrieval + LLM call. Response renders with three
   transparency panels: **RetrievalChips** (which docs were consulted),
   **RetrievalStrengthBanner** (amber warning if top match was weak),
   **ChecksBanner** (flags missing sections or fabricated citations). Also a
   **Quality badge** (A-F grade aggregating all three signals).
4. Architect can Copy the markdown, or download as `.md` or Word doc.

**Path B: upload a draft (built and working today)**

1. Architect goes to `/review`, uploads a `.md` file (either generated
   elsewhere or hand-written)
2. Backend **auto-suggests the target sub-folder** by running BM25 retrieval
   on the file's content and taking the folder-majority of the top matches
3. Also auto-suggests a slugified filename, a PR title, and a one-line KB
   description (from the file's Purpose of Document paragraph)
4. Architect confirms or edits the suggestions, hits Open PR
5. Backend uses the **GitHub API** to create a branch, drop the file at
   `docs/patterns/<category>/<slug>.md`, and open a PR against `main`.
   **CODEOWNERS** auto-assigns Michael as reviewer.
6. Michael reviews on GitHub, merges. Merge triggers a redeploy workflow.
   Cloud Run pulls the new image, backend reloads the KB in memory. The
   new pattern is retrievable for the next generation. **Self-healing loop.**

*Path B is fully built and demoable today.* Uploaded a real pattern, PR
opened in the private test repo (SammyBolger/priv), reviewed, merged.

*Path A is built through the retrieval + prompt assembly + output checks
+ UI. The LLM call itself is blocked on GCP / Vertex AI provisioning.*

---

## 4. Tech stack + why we chose it

| Layer | Tech | Why |
|---|---|---|
| Backend | **Python + FastAPI** | Python has the AI ecosystem. FastAPI = fast, typed, auto-OpenAPI. |
| Retrieval | **BM25 hand-rolled** | Deterministic, transparent, zero deps. Easy to reason about. |
| LLM | **Gemini 2.5 Pro** via **LiteLLM proxy** | LiteLLM = one OpenAI-compatible abstraction. Swap providers by env var only. |
| Frontend | **Docusaurus + React** | Right tool for a markdown-heavy KB site with custom pages. |
| KB search | **@easyops-cn/docusaurus-search-local** | No external service, indexes at build time, embedded in the KB landing (not the navbar). |
| GitHub API | **httpx** + `gh` CLI auth | Simple, no new deps. Prod swaps to a GitHub App token in Secret Manager. |
| Deployment | **Cloud Run + IAP** (planned) | Serverless, autoscales, IAP handles SSO with zero app code. |
| CI/CD | **GitHub Actions + WIF** | Keyless auth to GCP. Plan on PR, apply on merge. |
| Infra | **Terraform** (planned) | Reproducible, reviewable GCP setup. |

---

## 5. How retrieval works (memorize this cold)

1. **Split docs into two piles at startup:**
   - **Foundational** = always included (pattern template, principles,
     guardrails, checklist). Ground truth for every scenario.
   - **Topical** = pre-indexed, scored per request.
2. **Per request:**
   - Extract keywords from scenario, drop stop words.
   - Score every topical doc with **BM25** (k1=1.5, b=0.75).
   - Add **title boost** (+2 per keyword found in doc title).
   - Add **phrase bonus** (+3 per two-word phrase found in content).
3. **Adaptive threshold:** `max(3.0, 0.35 × top_score)`. Filters noise.
4. **Per-mode category quotas** so one loud category cannot crowd others:
   - Pattern mode: 3 patterns + 2 policies + 2 standards + 1 position
   - Assurance mode: 1 pattern + 3 policies + 2 standards + 1 position
   - Question mode: 2 patterns + 1 policy + 1 standard + 1 position
5. **Stitch prompt:** foundational docs first, retrieved topical docs
   next, user scenario **last** (recency matters for smaller models).
6. **Send to LLM. Run output checks. Return everything to frontend.**

---

## 6. Output checks (the "no fabricated citations" story)

After the LLM answers, run **two deterministic checks**:
- **Missing sections** pattern-mode responses must have Context, Architecture
  Principles, Canonical Patterns, Sources, and at least one Mermaid diagram.
- **Invalid citations** extract every `docs/...` path from the Sources
  section, verify each against the known corpus.

Failures surface in the **ChecksBanner** on the UI. The Quality badge
aggregates these signals into a single A-F grade so users get an at-a-
glance trust signal before they scan the specifics.

**For a governance tool, a fabricated citation is the worst possible failure.**

---

## 7. Biggest technical decisions

1. **BM25 vs embeddings.** Chose BM25 first. Deterministic, transparent,
   zero deps, easy to explain to reviewers. Hybrid (BM25 + Vertex AI
   embeddings) is the planned upgrade **once evals justify the complexity**.
2. **Single `llm_client.py` abstraction.** All LLM calls go through one
   function. Provider swap = env var change, not code change. Critical
   because Entegris LiteLLM gateway was not ready when I started.
3. **Env-var-driven demo mode.** Same source code, two builds. GH Pages
   sets `AI4EA_DEMO_MODE=true`; GCP build does not.
4. **Per-mode category quotas.** Without them, a policy with vocabulary
   overlap could crowd out the patterns that pattern-generation needs.
5. **Folder-majority category classification for the PR upload flow.**
   When a user uploads a pattern via `/review`, we reuse the same
   retrieval to find similar existing patterns, then take the majority
   vote of their sub-folders. Zero extra LLM call, reuses what already
   works. Recruiter interviews love this kind of reuse-over-rebuild move.
6. **Autogenerated Docusaurus sidebar + custom swizzle for KB browsing.**
   A new file dropped into any sub-folder auto-appears in the sidebar and
   in the grouped category page. Zero manual sidebar maintenance when
   patterns get PR'd in. Makes the self-healing loop actually self-healing.

---

## 8. Biggest challenges

1. **Regression audit between old and new versions.** My newer version
   had silently lost 4 retrieval features (per-mode quotas, adaptive
   threshold, always-included principles, `standards/missing/` exclude).
   Diagnosed by diffing old vs new, restored by porting the old logic to
   Python. **Lesson: I need evals from day one so regressions get caught
   in CI, not by manual diff.**
2. **Broken markdown links after restructuring.** Split each principles
   file into per-principle sub-files (73 total), then pattern docs still
   linked at the old flat paths. Prod build broke because Docusaurus is
   strict on broken links. Fixed by rewriting the affected links in the
   two pattern files.
3. **Dev-only search limitation.** The search plugin only builds its
   index during `bun run build`, not in dev mode, so the search bar spins
   forever in local dev. Not a real problem (prod build works, GH Pages +
   Cloud Run both run prod builds) but a rough dev-experience quirk worth
   naming rather than pretending it doesn't exist.

---

## 9. What I would do differently

- **Evals from day one.** Small golden set of scenarios with expected
  retrieved docs and expected citations. Runs in CI. Catches silent
  retrieval regressions like the one above.
- **Split retrieval quality from generation quality.** Unit-test the
  retriever alone so I can iterate on scoring without an LLM in the loop.
  Way faster iteration.
- **Version the KB.** Git-tag KB releases so every generated pattern
  records which KB SHA it came from. Makes regeneration reproducible.

---

## 10. Metrics + scale

- **KB (foundational):** 11 always-included docs (pattern template,
  architecture checklist, assurance guardrails, index, all principles)
- **KB (topical):** ~40 docs across patterns / positions / policies /
  standards. Fits in memory, few MB.
- **Principles:** 73 individual principle docs across 9 sub-folders,
  split for citation granularity (LLM cites a specific principle, not a
  whole file)
- **Retrieval quality** (spot check for "SAP → BigQuery ingestion"
  scenario): top 3 hits were `data-ingestion-pattern`, `sap-integration-
  pattern`, `event-driven-timeseries-pattern`. Semantically correct.
- **Backend:** 6 Python files, ~1000 LOC. Deliberately small.
- **Cost:** Cloud Run scales to zero when idle. Vertex AI billing per
  request. Estimated under $50/mo at expected internal usage.

---

## 11. Likely questions + strong answers

**Q: Why BM25 instead of embeddings?**
A: Three reasons. (1) Deterministic, same input gives same retrieval.
(2) Zero dependencies. (3) Transparent, a reviewer can see exactly which
words matched. Hybrid retrieval (BM25 + Vertex AI embeddings, combined
via reciprocal rank fusion) is the planned upgrade **once evals show BM25
alone is not enough**. I did not want to add complexity that had not
proven itself.

**Q: How do you prevent hallucinated citations?**
A: Post-response deterministic check. Extract every `docs/.../file.md`
path from the Sources section, compare each against the known corpus.
Invalid citations flag in the UI banner and get rolled into the Quality
badge. **Not automatic rejection** because sometimes the LLM cites
something valid we have not indexed yet. Human review makes the final call.

**Q: How would you evaluate this system?**
A: Two layers. **Retrieval quality:** golden-set of 20 scenarios with
expected top-3 retrieved docs. Metric = hit-rate at K. Runs in CI.
**Generation quality:** per-scenario expected properties (has-section-X,
cites-doc-Y, no-fabricated-citations). Optional LLM-as-judge for prose
quality. Both feed a scorecard that catches regressions.

**Q: How would you scale this?**
A: Cloud Run scales frontend + backend independently. KB fits in memory
so no vector DB overhead. If KB grows past 500 docs, **hybrid retrieval
with pgvector on Cloud SQL** becomes the play. For LLM cost at scale,
**cache identical scenarios** (same input = same retrieval = same response).

**Q: How is auth handled?**
A: **IAP** at the load balancer, fronted by Entegris SSO. Backend trusts
the IAP JWT header via a FastAPI dependency. **No app-level auth code
required** for user auth. For the PR workflow, backend holds a GitHub App
token in **Secret Manager**.

**Q: Walk me through the PR-to-KB workflow.**
A: (Use Section 3, Path B verbatim.) The classifier is intentionally boring:
same BM25 retrieval, count the sub-folders of the top hits, pick the
majority. If user disagrees they override in the confirm dialog. One click,
one PR, CODEOWNERS routes to Michael, merge triggers redeploy.

**Q: What is the trickiest part of the retrieval logic?**
A: The **per-mode category quotas**. Without them, a policy doc with
vocabulary overlap could crowd out the pattern docs that pattern-
generation actually needs. Different modes weight categories differently
because assurance mode wants policies first, pattern mode wants patterns
first. Combined with an **adaptive threshold** so a hot query filters
aggressively and a lukewarm one is more generous.

**Q: How does the PR-to-KB workflow keep the KB in sync?**
A: PR merges to `main` → GitHub Actions runs the redeploy workflow →
Cloud Run pulls the new image → backend reloads KB from disk on startup.
**Takes about 30 seconds.** The pattern the architect just approved is
retrievable for the next generation. Self-healing.

**Q: What is next on the roadmap?**
A: Three tiers.
- **Must-have for prod:** IAP, Vertex AI wiring, Secret Manager,
  structured logging.
- **Should-have for real product:** the **refine flow** (multi-turn
  regeneration with feedback), **hybrid retrieval**, an **evals harness**,
  **feedback capture** (thumbs up/down to Cloud Logging), **streaming
  responses** via SSE.
- **Nice-to-have:** direct-edit Monaco mode, session memory, KB versioning.

---

## 12. What to volunteer if asked "tell me more"

- The **PR upload workflow is actually built and demoable** (not planned).
  End-to-end: upload a real markdown file, backend suggests folder via
  reused retrieval, PR opens in a real GitHub repo, reviewer merges. This
  is rarer than it looks; most RAG projects stop at "generate output" and
  never close the human-in-the-loop back into their KB.
- The **regression story** shows you diff-check and take ownership of
  quality. Do not skip this one.
- **DPP-GraphRAG** is a peer project by a senior data scientist at
  Entegris that I studied to shape this project's architecture. Same
  Python + FastAPI + Terraform + Cloud Run + IAP shape. **Match its
  layout intentionally** so it looks familiar to reviewers here.
- The **honest gap:** the LLM piece is not fully wired end-to-end yet
  because we do not have Vertex AI access. **Everything upstream of the
  LLM call is proven working locally.** GCP unlock is 2-3 weeks of work.

---

## 13. Anti-patterns (do not say these)

- Do not oversell. If Yan asks whether generation is live in prod, the
  answer is **not yet, blocked on GCP project provisioning**.
- Do not claim hybrid retrieval, evals, or the refine flow are built.
  They are **designed and planned**, which is a strength to talk about
  differently.
- Do not use the phrase "leverage" or "seamlessly" or "robust". They are
  AI-writing tells and technical interviewers notice.
