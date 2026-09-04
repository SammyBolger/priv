# AI4EA backend

Python FastAPI backend for AI4EA. Loads the knowledge base, retrieves
relevant docs for each scenario, calls the LLM, runs output checks,
returns the response.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Environment variables

Copy `.env.example` to `.env` and fill in values, or export them in your
shell:

```bash
export LITELLM_BASE_URL=...
export LITELLM_API_KEY=...   # or GITHUB_TOKEN if using github models
export LITELLM_MODEL=...
```

## Run

```bash
uvicorn main:app --port 3001 --reload
```

Server listens on port 3001, which is what the frontend expects.

## Endpoints

- `POST /generate` takes a scenario, returns a generated pattern
- `GET  /health` liveness check for Cloud Run

## Layout

- `main.py`          FastAPI app, wires everything together
- `config.py`        env vars and paths
- `retrieval.py`     KB loading, BM25 scoring, prompt assembly (per-mode quotas + adaptive threshold)
- `output_check.py`  deterministic checks on LLM responses (missing sections + invalid citations)
- `llm_client.py`    HTTP wrapper for the LLM (single abstraction point for LiteLLM swap)

## CLI helpers (planned)

`retrieval_check.py` and `output_check.py` as command-line entry points so
you can preview what retrieval picks for a scenario, or validate a canned
LLM response, without spinning up the server. Ports of the two dev tools
from the old TypeScript backend. Not built yet.
