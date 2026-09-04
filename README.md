# AI4EA: AI for Enterprise Architecture

AI-powered assistant that helps Entegris architects draft reference
architectures, run assurance reviews, and answer questions grounded in
the Entegris architecture knowledge base.

A human architect always reviews and edits what the model produces
before anything lands in the knowledge base.

## Structure

```
ai4ea/
├── frontend/          Docusaurus site (KB + /generate + /review UI)
├── backend/           Python FastAPI backend (retrieval + LLM + checks)
├── .github/workflows/ deploy workflow for GitHub Pages
└── README.md
```

See `frontend/README.md` and `backend/README.md` for the details of each.

## Run locally

Two terminals.

**Backend:**

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export LITELLM_BASE_URL=...
export LITELLM_API_KEY=...
export LITELLM_MODEL=...
uvicorn main:app --port 3001 --reload
```

**Frontend:**

```bash
cd frontend
bun install
bun run start
```

Open http://localhost:3000/generate.

## Deployments

**GitHub Pages (public demo):** https://EntegrisInternal.github.io/ai4ea/

Browsable KB. `/generate` shows a "public demo, generation disabled"
banner because there is no backend behind GitHub Pages. Built by
`.github/workflows/deploy-pages.yml` with `AI4EA_DEMO_MODE=true`.

**GCP Cloud Run (internal, planned):** the full app behind Entegris SSO,
with the Python backend calling Vertex AI (Gemini) via the LiteLLM
gateway. Not deployed yet, waiting on GCP project access.

## Status

Early-stage POC. Running locally with a public demo on GitHub Pages.
Full production deployment planned once we have GCP project access.
