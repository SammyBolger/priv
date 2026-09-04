"""
Loads the entegris knowledge base at startup and does per-request retrieval.

Two jobs:
1. On startup, walk the docs folder and split every markdown file into two
   piles. "foundational" docs always get sent to the llm. "topical" docs get
   pre-indexed so we can bm25-score them fast per request.
2. On each request, extract keywords from the scenario, score every topical
   doc, keep the best per category (mode-specific quotas), and stitch the
   whole thing into one big user prompt.

The design rule is: some docs are ground truth for every scenario (the
catalog, pattern template, principles, guardrails, checklist). Others are
topical and only earn a slot if their keywords match what the user asked.
"""

import math
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Literal

from config import DOCS_DIR


# ---------------------------------------------------------------------------
# Types + constants
# ---------------------------------------------------------------------------

# the three modes the frontend can send. the [MODE: ...] tag in the user
# message tells us which one to use.
Mode = Literal["pattern", "assurance", "question"]

# maps each mode to the system prompt file used for that mode. prompts live
# as markdown so we can edit them without changing code.
SYSTEM_PROMPT_PATHS: dict[Mode, str] = {
    "pattern":   "prompts/pattern-generation-system-prompt.md",
    "assurance": "prompts/assurance-review-system-prompt.md",
    "question":  "prompts/question-system-prompt.md",
}

# docs that are ALWAYS sent to the llm no matter what the user asked. these
# are the "ground truth" docs. the catalog (index.md) lets the llm answer
# "how many X do we have" correctly. the template gives the llm the output
# shape for pattern mode. guardrails + checklist are the secure-by-design
# constraints and arb/trb evaluation criteria that every pattern should be
# grounded in.
ALWAYS_INCLUDED = {
    "context/architecture-patterns-and-template.md",
    "context/architecture-assurance-guardrails.md",
    "context/architecture-checklist.md",
    "index.md",
}

# whole subfolders that are ALWAYS sent to the llm. principles set the rules
# for every scenario, so they belong in foundational context instead of the
# topical pool where they'd have to re-earn a spot per request.
ALWAYS_INCLUDED_DIRS = ["principles/"]

# subfolders we search for "topical" docs. principles is intentionally not
# here (it's always-included above). policies + standards are scenario-
# specific enough that we let bm25 decide which ones apply per request.
TOPICAL_DIRS = ["patterns/", "positions/", "policies/", "standards/"]

# paths under a topical dir that we DON'T index. keeps placeholder stubs
# from diluting bm25 scores and being cited as sources by the llm.
TOPICAL_EXCLUDE_DIRS = ["standards/missing/"]

# per-category quotas keyed by mode. instead of picking a global top-N
# across every topical doc (which lets one loudly-matching category crowd
# others out entirely), we score each doc and then cap how many can win per
# category. quotas differ by mode because the modes have different needs:
#   - pattern:   architect drafts from similar existing patterns, so
#                patterns lead and policies/standards round it out.
#   - assurance: architect reviews a proposal against compliance criteria,
#                so policies and standards lead - assurance is fundamentally
#                about "does this violate any rule" not "which pattern is it".
#   - question:  freeform q&a, usually focused. leaner because foundational
#                context alone covers most short questions.
TOPICAL_QUOTAS: dict[Mode, dict[str, int]] = {
    "pattern": {
        "patterns/":  3,
        "policies/":  2,
        "standards/": 2,
        "positions/": 1,
    },
    "assurance": {
        "patterns/":  1,
        "policies/":  3,
        "standards/": 2,
        "positions/": 1,
    },
    "question": {
        "patterns/":  2,
        "policies/":  1,
        "standards/": 1,
        "positions/": 1,
    },
}

# minimum score a topical doc must clear to fill a quota slot. combines an
# absolute floor with a fraction-of-top-score. the fraction adapts to how
# strong the top match is (a hot query filters aggressively, a lukewarm one
# is more generous). the floor prevents random lexical hits from being
# promoted when nothing matched well overall.
TOPICAL_MIN_SCORE_FLOOR = 3.0
TOPICAL_MIN_SCORE_FRACTION = 0.35

# bm25 tuning knobs. k1 controls how fast extra repeats of a word stop
# adding score (saturation). b controls how much we punish long docs for
# being long. 1.5 and 0.75 are the standard defaults.
BM25_K1 = 1.5
BM25_B = 0.75

# extra points on top of the bm25 score. a keyword in the doc's title, or
# two of the user's words appearing together as a phrase, are strong
# signals so they earn a small bump.
TITLE_BOOST = 2
PHRASE_BONUS = 3

# common english words to skip when we extract keywords. don't help with
# retrieval and just make the query noisy.
STOP_WORDS = {
    "a", "an", "and", "are", "as", "at", "be", "but", "by", "do", "does",
    "for", "from", "had", "has", "have", "he", "her", "his", "how", "if",
    "in", "is", "it", "its", "just", "let", "like", "may", "me", "more",
    "my", "no", "not", "of", "on", "or", "our", "out", "she", "should",
    "so", "than", "that", "the", "their", "them", "then", "there", "these",
    "they", "this", "those", "to", "too", "was", "we", "what", "when",
    "where", "which", "who", "why", "will", "with", "would", "you", "your",
    "could", "also", "into", "very", "need", "want", "i", "us", "am",
    "make", "made", "new", "old", "get", "got", "yet", "still",
}

# regex that pulls "words" out of text: runs of letters/digits/hyphens that
# start with a letter and are at least 3 chars long. catches things like
# "bigquery" and "real-time".
WORD_RE = re.compile(r"[a-z][a-z0-9-]{2,}")

# regex to spot the [MODE: ...] tag the frontend prepends to user messages.
MODE_PREFIX_RE = re.compile(r"\[MODE:\s*([^\]]+)\]", re.IGNORECASE)


@dataclass
class RawDoc:
    """one markdown file straight off disk."""
    path: str      # relative to docs/, forward-slash separated
    content: str


@dataclass
class IndexedDoc:
    """a topical doc after we've pre-processed it for searching. everything
    here is computed once at startup so scoring per-request is arithmetic."""
    path: str
    content: str
    title: str
    lower_content: str
    term_freq: dict[str, int]
    length: int


@dataclass
class CorpusStats:
    """corpus-wide numbers bm25 needs. built once over the topical pool."""
    doc_freq: dict[str, int]
    avg_length: float
    total_docs: int


@dataclass
class EngineContext:
    """what load_context() returns. the server keeps this in memory and
    reuses it for every request."""
    foundational: list[RawDoc]
    topical_pool: list[IndexedDoc]
    stats: CorpusStats
    system_prompts: dict[Mode, str]


@dataclass
class AssembledPrompt:
    """what assemble_prompt() returns. has the system + user prompt ready
    to send to the llm, plus debug info (keywords, retrieved docs) the
    server logs and the frontend displays."""
    mode: Mode
    system_prompt: str
    user_prompt: str
    keywords: list[str]
    retrieved: list[tuple[str, float]]  # (doc path, rounded score)


# ---------------------------------------------------------------------------
# Loading
# ---------------------------------------------------------------------------

def read_all_markdown(root: Path) -> list[RawDoc]:
    """walk a directory and read every .md and .mdx file inside. sorted
    for deterministic order which makes debug logs easier to compare."""
    out: list[RawDoc] = []
    for path in sorted(root.rglob("*")):
        # skip hidden files like .DS_Store. they're not useful and would
        # just clutter results.
        if any(part.startswith(".") for part in path.parts):
            continue
        if path.is_file() and path.suffix in (".md", ".mdx"):
            rel = path.relative_to(root).as_posix()
            out.append(RawDoc(path=rel, content=path.read_text(encoding="utf-8")))
    return out


def is_in_topical_dirs(path: str) -> bool:
    """true if the doc is in a topical dir AND not under an exclude dir."""
    if any(path.startswith(d) for d in TOPICAL_EXCLUDE_DIRS):
        return False
    return any(path.startswith(d) for d in TOPICAL_DIRS)


def is_in_always_included_dirs(path: str) -> bool:
    """true if the doc lives in one of the always-include folders. separate
    from ALWAYS_INCLUDED (specific files) so we can promote a whole folder
    like principles/ without listing every file."""
    return any(path.startswith(d) for d in ALWAYS_INCLUDED_DIRS)


def get_topical_category(path: str) -> str | None:
    """which topical dir a path belongs to (e.g. 'patterns/'), or None if
    it isn't in any of them. used to enforce per-category retrieval quotas."""
    for d in TOPICAL_DIRS:
        if path.startswith(d):
            return d
    return None


def tokenize(text: str) -> list[str]:
    """same tokenization for the query and the docs so scoring is fair.
    lowercase, drop stop words, keep words that are 3+ chars and start
    with a letter."""
    return [w for w in WORD_RE.findall(text.lower()) if w not in STOP_WORDS]


def extract_title(content: str) -> str:
    """pull the doc's main title so we can boost matches in it. first try
    the first '# heading', then fall back to a frontmatter 'title:' line.
    empty string if we find neither."""
    heading = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
    if heading:
        return heading.group(1).strip()
    frontmatter = re.search(r"^title:\s*(.+)$", content, re.MULTILINE)
    if frontmatter:
        return frontmatter.group(1).strip()
    return ""


def build_indexed_doc(raw: RawDoc) -> IndexedDoc:
    """pre-process one raw doc: count words, measure length, grab title,
    stash a lowercased copy for phrase lookups."""
    tokens = tokenize(raw.content)
    term_freq: dict[str, int] = {}
    for tok in tokens:
        term_freq[tok] = term_freq.get(tok, 0) + 1
    return IndexedDoc(
        path=raw.path,
        content=raw.content,
        title=extract_title(raw.content),
        lower_content=raw.content.lower(),
        term_freq=term_freq,
        length=len(tokens),
    )


def build_corpus_stats(docs: list[IndexedDoc]) -> CorpusStats:
    """corpus-wide stats bm25 needs: how many docs each word appears in
    (rare words count for more) and the average doc length."""
    doc_freq: dict[str, int] = {}
    total_length = 0
    for doc in docs:
        total_length += doc.length
        # a word counts once per doc here, no matter how often it appears.
        for word in doc.term_freq.keys():
            doc_freq[word] = doc_freq.get(word, 0) + 1
    avg_length = (total_length / len(docs)) if docs else 0.0
    return CorpusStats(doc_freq=doc_freq, avg_length=avg_length, total_docs=len(docs))


def load_context() -> EngineContext:
    """load everything once at server startup. doing this at boot means we
    don't re-read files from disk on every user request."""
    all_docs = read_all_markdown(DOCS_DIR)

    # sort each doc into two piles based on its path. foundational docs go
    # as-is, topical docs get pre-indexed so we can score them fast.
    foundational: list[RawDoc] = []
    topical_pool: list[IndexedDoc] = []

    for doc in all_docs:
        if doc.path in ALWAYS_INCLUDED or is_in_always_included_dirs(doc.path):
            foundational.append(doc)
        elif is_in_topical_dirs(doc.path):
            topical_pool.append(build_indexed_doc(doc))
        # anything else (intro.md, extra context files, etc) gets ignored.

    stats = build_corpus_stats(topical_pool)

    # load the three system prompt files.
    system_prompts: dict[Mode, str] = {}
    for mode, rel in SYSTEM_PROMPT_PATHS.items():
        system_prompts[mode] = (DOCS_DIR / rel).read_text(encoding="utf-8")

    topical_names = "+".join(d.rstrip("/") for d in TOPICAL_DIRS)
    print(
        f"[context] foundational={len(foundational)} "
        f"topicalPool={len(topical_pool)} "
        f"avgLength={round(stats.avg_length)} "
        f"(topical: {topical_names})"
    )

    return EngineContext(
        foundational=foundational,
        topical_pool=topical_pool,
        stats=stats,
        system_prompts=system_prompts,
    )


# ---------------------------------------------------------------------------
# Retrieval
# ---------------------------------------------------------------------------

def extract_keywords(scenario: str) -> list[str]:
    """pull keywords out of the user's scenario. strip the [MODE: ...] tag
    first so it doesn't pollute the results, then use the same tokenization
    as the docs. dedupe while preserving order."""
    stripped = MODE_PREFIX_RE.sub(" ", scenario)
    seen: set[str] = set()
    out: list[str] = []
    for w in tokenize(stripped):
        if w in seen:
            continue
        seen.add(w)
        out.append(w)
    return out


def bm25_score(doc: IndexedDoc, query_terms: list[str], stats: CorpusStats) -> float:
    """score a doc against the query using bm25. rare words score higher
    than common ones (idf), and long docs don't win just for being long
    (length normalization)."""
    if stats.avg_length == 0:
        return 0.0

    score = 0.0
    for term in query_terms:
        freq = doc.term_freq.get(term, 0)
        if freq == 0:
            continue

        # idf: words in fewer docs are more useful for telling docs apart,
        # so they get a bigger weight.
        df = stats.doc_freq.get(term, 0)
        idf = math.log(1 + (stats.total_docs - df + 0.5) / (df + 0.5))

        # the bm25 term-frequency part. the k1/b math saturates repeats and
        # normalizes for doc length using the corpus average.
        numerator = freq * (BM25_K1 + 1)
        denominator = freq + BM25_K1 * (1 - BM25_B + BM25_B * (doc.length / stats.avg_length))
        score += idf * (numerator / denominator)

    return score


def build_phrases(keywords: list[str]) -> list[str]:
    """turn keywords into consecutive two-word phrases. ['data', 'lake',
    'strategy'] -> ['data lake', 'lake strategy']. used to reward docs
    that contain the whole phrase, not just the words scattered around."""
    return [f"{keywords[i]} {keywords[i + 1]}" for i in range(len(keywords) - 1)]


def score_topical_doc(
    doc: IndexedDoc,
    keywords: list[str],
    phrases: list[str],
    stats: CorpusStats,
) -> float:
    """full score for one topical doc: bm25 base + title boost per keyword
    that appears in the title + phrase bonus per phrase that appears in the
    content. the bonuses just nudge strong matches up."""
    if not keywords:
        return 0.0

    score = bm25_score(doc, keywords, stats)

    # title boost. tokenize the title once and add points per keyword in it.
    title_words = set(tokenize(doc.title))
    for kw in keywords:
        if kw in title_words:
            score += TITLE_BOOST

    # phrase bonus. add points per query phrase that appears verbatim.
    for phrase in phrases:
        if phrase in doc.lower_content:
            score += PHRASE_BONUS

    return score


def detect_mode(scenario: str) -> Mode:
    """figure out which mode the user picked from the [MODE: ...] tag.
    defaults to pattern mode if no tag is present."""
    m = MODE_PREFIX_RE.search(scenario)
    if not m:
        return "pattern"
    tag = m.group(1).strip().upper()
    if "ASSURANCE" in tag:
        return "assurance"
    if "QUESTION" in tag:
        return "question"
    return "pattern"


def assemble_prompt(context: EngineContext, scenario: str) -> AssembledPrompt:
    """the main per-request function. takes the loaded context + the user's
    scenario, returns everything the server needs to call the llm."""

    # step 1: which mode are we in?
    mode = detect_mode(scenario)

    # step 2: what keywords should we search with?
    keywords = extract_keywords(scenario)

    # build two-word phrases (e.g. 'data' + 'lake' -> 'data lake'). a
    # phrase match is a much stronger signal than two loose words nearby.
    phrases = build_phrases(keywords)

    # step 3: score every topical doc, drop zeros.
    all_scored: list[tuple[IndexedDoc, float]] = []
    for doc in context.topical_pool:
        s = score_topical_doc(doc, keywords, phrases, context.stats)
        if s > 0:
            all_scored.append((doc, s))

    # per-request threshold using the top match. below this a doc is
    # treated as noise and won't fill a quota slot even if its category
    # has empty slots.
    top_score = max((s for _, s in all_scored), default=0.0)
    score_threshold = max(TOPICAL_MIN_SCORE_FLOOR, TOPICAL_MIN_SCORE_FRACTION * top_score)
    strong_scored = [(d, s) for d, s in all_scored if s >= score_threshold]

    # group above-threshold docs by category so we can enforce quotas.
    # without this, one loudly-matching category can crowd every other
    # category out of the top slots.
    by_category: dict[str, list[tuple[IndexedDoc, float]]] = {}
    for d, s in strong_scored:
        cat = get_topical_category(d.path)
        if cat is None:
            continue
        by_category.setdefault(cat, []).append((d, s))

    mode_quotas = TOPICAL_QUOTAS[mode]

    # keep the top-N per category and merge. final sort keeps the
    # retrieved list in score order so the frontend chips display
    # best-first regardless of category.
    scored: list[tuple[IndexedDoc, float]] = []
    for cat, bucket in by_category.items():
        bucket.sort(key=lambda x: x[1], reverse=True)
        quota = mode_quotas.get(cat, 0)
        scored.extend(bucket[:quota])
    scored.sort(key=lambda x: x[1], reverse=True)

    # step 4: build the big user prompt string.
    sections: list[str] = []

    sections.append("# Foundational Context")
    sections.append(
        "_The following documents are always included as ground truth - "
        "pattern template, full catalog, and enterprise architecture principles._"
    )
    for doc in context.foundational:
        sections.append(f"## Source: `docs/{doc.path}`\n\n{doc.content.strip()}")

    if scored:
        sections.append("# Retrieved Topical Context")
        sections.append(
            "_The following documents were retrieved via keyword search of the scenario._"
        )
        for doc, _ in scored:
            sections.append(f"## Source: `docs/{doc.path}`\n\n{doc.content.strip()}")
    else:
        # no topical matches. tell the llm so it knows to lean on
        # foundational only.
        sections.append("# Retrieved Topical Context")
        sections.append(
            "_No topical documents matched the scenario keywords. Rely on the "
            "foundational context above and acknowledge any gaps explicitly "
            "in your response._"
        )

    # user's scenario goes LAST. recency matters for smaller models and
    # putting the question at the end is the standard pattern.
    sections.append("# New Scenario\n")
    sections.append(scenario)

    return AssembledPrompt(
        mode=mode,
        system_prompt=context.system_prompts[mode],
        user_prompt="\n\n".join(sections),
        keywords=keywords,
        # round the scores so the debug panel shows tidy numbers.
        retrieved=[(d.path, round(s, 1)) for d, s in scored],
    )
