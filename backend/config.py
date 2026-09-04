"""
Central place for backend config. Reads env vars, provides defaults so the
server can boot with nothing set (except the llm creds).
"""

import os
from pathlib import Path

# where the docs folder lives. we go one level up from backend/ into
# frontend/docs. override with DOCS_DIR env var if you're pointing at a
# different kb (e.g. for tests).
_default_docs = Path(__file__).parent.parent / "frontend" / "docs"
DOCS_DIR = Path(os.environ.get("DOCS_DIR", _default_docs))

# port the backend listens on. the frontend expects 3001 in local dev.
PORT = int(os.environ.get("PORT", 3001))

# llm settings. LITELLM_API_KEY falls back to GITHUB_TOKEN so we can still
# hit github models while the litellm gateway isn't ready yet.
LLM_BASE_URL = os.environ.get("LITELLM_BASE_URL", "")
LLM_API_KEY = os.environ.get("LITELLM_API_KEY") or os.environ.get("GITHUB_TOKEN", "")
LLM_MODEL = os.environ.get("LITELLM_MODEL", "")

# how creative the model is allowed to be. low = focused and repeatable,
# which is what we want for architecture output that should be consistent
# rather than imaginative. override with LITELLM_TEMPERATURE if needed.
LLM_TEMPERATURE = float(os.environ.get("LITELLM_TEMPERATURE", "0.2"))
