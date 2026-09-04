"""
The only place in the backend that talks to an llm. every llm call goes
through generate() below. the reason for keeping it in one file is that
when we switch to the official litellm gateway later, we only have to
change env vars, not rewrite a bunch of code.
"""

import httpx

from config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, LLM_TEMPERATURE


class LLMError(Exception):
    """raised when the llm call fails."""


def generate(system_prompt: str, user_prompt: str) -> str:
    """send a chat request to the llm and return the text response."""

    # bail early if no api key. better to fail loud here than to send a
    # broken request and get a confusing error back.
    if not LLM_API_KEY:
        raise LLMError(
            "no api key configured. set LITELLM_API_KEY, or GITHUB_TOKEN "
            "for github models, or any value for ollama."
        )

    url = f"{LLM_BASE_URL}/chat/completions"
    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json",
    }
    body = {
        "model": LLM_MODEL,
        # the messages array is the conversation. system message tells the
        # llm its role, user message contains the prompt + scenario.
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        # upper bound on how much text the llm can return in one response.
        # 4096 is enough for a full pattern with all sections.
        "max_tokens": 4096,
        "temperature": LLM_TEMPERATURE,
    }

    # 120s read timeout because llm calls can be slow, especially with
    # thinking-style models.
    try:
        with httpx.Client(timeout=120.0) as client:
            response = client.post(url, headers=headers, json=body)
    except httpx.RequestError as exc:
        raise LLMError(f"llm request failed: {exc}") from exc

    if response.status_code != 200:
        # slice the body so a giant error blob doesn't take over the logs.
        body_text = response.text[:400]
        raise LLMError(f"llm request failed [{response.status_code}]: {body_text}")

    data = response.json()
    try:
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        raise LLMError(f"unexpected llm response shape: {str(data)[:300]}")

    # sanity check. if the llm returned nothing, surface it.
    if not content:
        raise LLMError("llm returned an empty response.")

    return content
