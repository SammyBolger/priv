"""
After the llm answers, run a couple of quick deterministic checks on the
text. this doesn't change the answer, it just flags problems so the
frontend can show when an output is missing required sections or is citing
docs that don't actually exist.

for a governance tool, a fabricated citation is the worst kind of mistake,
so it's worth catching automatically.
"""

import re
from dataclasses import dataclass, field

from retrieval import AssembledPrompt, EngineContext


# top-level sections a pattern-mode answer is supposed to have. these match
# the headings used by the example patterns in the knowledge base. we only
# check the essential ones so small wording differences don't cause false
# alarms. problem/solution/benefits/considerations live inside the pattern
# tables (as row labels) not as headings, so we don't check for them here.
REQUIRED_PATTERN_SECTIONS = [
    "Context",
    "Architecture Principles",
    "Canonical Patterns",
    "Sources",
]


@dataclass
class OutputCheck:
    """what check_output hands back. all three lists are empty when
    everything looks fine, so the caller can just check their lengths."""
    missing_sections: list[str] = field(default_factory=list)
    cited_sources: list[str] = field(default_factory=list)
    invalid_sources: list[str] = field(default_factory=list)


def has_section(response: str, name: str) -> bool:
    """true if the response has a markdown heading containing the given
    word (e.g. '## Context' or '### Sources'). case-insensitive so we're
    not picky about wording differences."""
    pattern = rf"^#+\s.*\b{re.escape(name)}\b"
    return re.search(pattern, response, re.MULTILINE | re.IGNORECASE) is not None


def extract_cited_sources(response: str) -> list[str]:
    """pull doc paths out of the '## Sources' section at the end. we look
    for anything shaped like 'docs/.../file.md' and dedupe."""
    # find where the sources section starts so we only read paths from there.
    m = re.search(r"^#+\s*sources\s*$", response, re.MULTILINE | re.IGNORECASE)
    section = response[m.start():] if m else ""
    matches = re.findall(r"docs/[^\s`)\]]+\.mdx?", section)

    # dedupe while preserving order.
    seen: set[str] = set()
    out: list[str] = []
    for path in matches:
        if path in seen:
            continue
        seen.add(path)
        out.append(path)
    return out


def check_output(
    context: EngineContext,
    assembled: AssembledPrompt,
    response: str,
) -> OutputCheck:
    """run the checks on one llm answer. needs the context (so it knows
    which doc paths are real) and the assembled prompt (so it knows which
    mode it was)."""

    # build the set of valid citations. the llm is told to cite paths like
    # 'docs/patterns/...', and our doc paths are relative to docs/, so we
    # add the 'docs/' prefix here to match what the llm writes.
    valid_paths: set[str] = set()
    for doc in context.foundational:
        valid_paths.add(f"docs/{doc.path}")
    for doc in context.topical_pool:
        valid_paths.add(f"docs/{doc.path}")

    # section check only applies to pattern mode, which has a fixed
    # structure. other modes don't have required sections.
    if assembled.mode == "pattern":
        missing = [n for n in REQUIRED_PATTERN_SECTIONS if not has_section(response, n)]
    else:
        missing = []

    # pattern docs must include at least one mermaid diagram (the sequence
    # diagrams section). if we're in pattern mode and there's no mermaid
    # fence, flag it the same way we flag a missing section.
    if assembled.mode == "pattern" and not re.search(r"```mermaid", response, re.IGNORECASE):
        missing.append("Sequence Diagram (mermaid)")

    # citation check applies to every mode that lists sources.
    cited = extract_cited_sources(response)
    invalid = [p for p in cited if p not in valid_paths]

    return OutputCheck(
        missing_sections=missing,
        cited_sources=cited,
        invalid_sources=invalid,
    )
