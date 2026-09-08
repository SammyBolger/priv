"""
GitHub PR creator. Opens a PR against the configured repo dropping a new
file at a given path.

Uses the user's local `gh` CLI for auth (`gh auth token`) so we don't need
to manage secrets in local dev. For the GCP deployment this file swaps to
reading a GitHub App token from Secret Manager.

Env vars:
    GITHUB_REPO           default "SammyBolger/priv"
    GITHUB_DEFAULT_BRANCH default "main"
    GITHUB_TOKEN          if set, used directly (skips `gh auth token`)
"""

import base64
import os
import subprocess

import httpx

REPO = os.environ.get("GITHUB_REPO", "SammyBolger/priv")
DEFAULT_BRANCH = os.environ.get("GITHUB_DEFAULT_BRANCH", "main")


class GitHubError(Exception):
    """raised when the github api call fails."""


def _get_token() -> str:
    """pull the auth token. env var wins, otherwise ask gh cli."""
    tok = os.environ.get("GITHUB_TOKEN", "").strip()
    if tok:
        return tok
    try:
        result = subprocess.run(
            ["gh", "auth", "token"],
            capture_output=True,
            text=True,
            check=True,
            timeout=5,
        )
        return result.stdout.strip()
    except FileNotFoundError:
        raise GitHubError(
            "gh cli not found and no GITHUB_TOKEN env var set. "
            "install gh (brew install gh) and run `gh auth login`."
        )
    except subprocess.CalledProcessError as exc:
        raise GitHubError(
            "gh auth token failed. run `gh auth login` and try again."
        ) from exc


def open_pr(
    *,
    file_path: str,
    file_content: str,
    branch: str,
    pr_title: str,
    pr_body: str = "",
) -> str:
    """
    create branch, commit file, open pr. returns pr url on success.

    steps (3 api calls):
      1. get default branch head sha (starting point for the new branch)
      2. create the new branch ref pointing at that sha
      3. put the file contents onto the new branch
      4. open the pr from new branch -> default branch

    the file is committed with the pr title as the commit message so the
    default review view shows the same title as the pr.
    """
    token = _get_token()
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    api = f"https://api.github.com/repos/{REPO}"

    with httpx.Client(timeout=30.0, headers=headers) as client:
        # 1. get base branch sha
        r = client.get(f"{api}/git/ref/heads/{DEFAULT_BRANCH}")
        if r.status_code != 200:
            raise GitHubError(f"lookup default branch failed: {r.status_code} {r.text[:200]}")
        base_sha = r.json()["object"]["sha"]

        # 2. create new branch
        r = client.post(
            f"{api}/git/refs",
            json={"ref": f"refs/heads/{branch}", "sha": base_sha},
        )
        if r.status_code == 422:
            # branch already exists - happens on retries. append short suffix.
            import secrets
            branch = f"{branch}-{secrets.token_hex(2)}"
            r = client.post(
                f"{api}/git/refs",
                json={"ref": f"refs/heads/{branch}", "sha": base_sha},
            )
        if r.status_code not in (200, 201):
            raise GitHubError(f"create branch failed: {r.status_code} {r.text[:200]}")

        # 3. write file to new branch
        content_b64 = base64.b64encode(file_content.encode("utf-8")).decode("ascii")
        r = client.put(
            f"{api}/contents/{file_path}",
            json={
                "message": pr_title,
                "content": content_b64,
                "branch": branch,
            },
        )
        if r.status_code not in (200, 201):
            raise GitHubError(f"commit file failed: {r.status_code} {r.text[:200]}")

        # 4. open pr
        r = client.post(
            f"{api}/pulls",
            json={
                "title": pr_title,
                "body": pr_body,
                "head": branch,
                "base": DEFAULT_BRANCH,
            },
        )
        if r.status_code not in (200, 201):
            raise GitHubError(f"open pr failed: {r.status_code} {r.text[:200]}")

        return r.json()["html_url"]
