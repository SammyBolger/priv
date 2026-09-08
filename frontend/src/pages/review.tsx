// The /review page. Human-in-the-loop step for adding new patterns to the KB.
//
// Structure matches the earlier gc-hero + gc-form-panel layout. Only the
// action buttons (choose file, open pr, submit another) use the newer
// chat-btn pill style so they feel consistent with the generator.
//
// Flow:
//   1. user picks a .md file to upload
//   2. backend inspects it (POST /suggest-pr-target) and returns a suggested
//      category (sub-folder under docs/patterns/) + slugified filename +
//      one-line kb description + the top KB docs it consulted
//   3. user confirms or edits, adds pr title + optional description
//   4. user submits (POST /submit-for-review), backend prepends the
//      description as frontmatter and opens a PR against the KB repo
//   5. we show the pr link and a "start over" button

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";

const BACKEND_URL = "http://localhost:3001";

// sub-folders under docs/patterns/. shown in the category dropdown so the
// user can override the auto-suggestion. add here if new categories appear.
const PATTERN_CATEGORIES = [
  "analytics",
  "application",
  "data",
  "infrastructure",
  "integration",
] as const;

interface Suggestion {
  category: string;
  filename: string;
  pr_title: string;
  kb_description: string;
  retrieved: Array<{ path: string; score: number }>;
}

interface SubmitResult {
  pr_url: string;
  branch: string;
  path: string;
  repo: string;
}

export default function ReviewPage(): ReactNode {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [category, setCategory] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [prTitle, setPrTitle] = useState<string>("");
  const [prDescription, setPrDescription] = useState<string>("");
  const [kbDescription, setKbDescription] = useState<string>("");

  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setError(null);
    setResult(null);
    setFile(f);
    setSuggestion(null);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", f);
      const res = await fetch(`${BACKEND_URL}/suggest-pr-target`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? `analyze failed (${res.status})`);
      }
      const data = (await res.json()) as Suggestion;
      setSuggestion(data);
      setCategory(data.category);
      setFilename(data.filename);
      setPrTitle(data.pr_title);
      setKbDescription(data.kb_description);
      setPrDescription("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "network error";
      setError(msg);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const onSubmit = useCallback(async () => {
    if (!file || !category || !filename || !prTitle) return;

    setError(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      formData.append("filename", filename);
      formData.append("pr_title", prTitle);
      formData.append("pr_description", prDescription);
      formData.append("kb_description", kbDescription);

      const res = await fetch(`${BACKEND_URL}/submit-for-review`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? `submit failed (${res.status})`);
      }
      const data = (await res.json()) as SubmitResult;
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "network error";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }, [file, category, filename, prTitle, prDescription, kbDescription]);

  const startOver = useCallback(() => {
    setFile(null);
    setSuggestion(null);
    setCategory("");
    setFilename("");
    setPrTitle("");
    setPrDescription("");
    setKbDescription("");
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const canSubmit =
    !submitting && Boolean(category) && Boolean(filename) && Boolean(prTitle.trim());

  const filePickerDisabled = analyzing || submitting;

  return (
    <Layout
      title="Submit for review, AI4EA"
      description="Upload a generated pattern and open a PR against the KB for review."
    >
      <main>
        {/* Hero: same brand treatment as the home page. */}
        <section className="gc-hero">
          <div className="gc-hero__inner">
            <span className="gc-eyebrow">AI4EA . Human-in-the-loop review</span>
            <h1 style={{ whiteSpace: "nowrap" }}>Submit a pattern for review.</h1>
            <p className="gc-hero__lead">
              Upload a Markdown file. The engine suggests where it belongs,
              you confirm, and a PR opens against the KB repo for an
              architect to review before it lands.
            </p>
          </div>
        </section>

        <section className="gc-section">
          <div className="gc-section__inner" style={{ maxWidth: 780 }}>
            {/* Step 1: File picker (until success) */}
            {!result && (
              <div className="gc-form-panel">
                <div className="gc-form-panel__label">1 · pick a markdown file</div>

                {/* Hidden native input; label acts as the styled button so we
                    control the look. Same click-to-open behavior as the
                    default button, no ugly default chrome. */}
                <label
                  className={`chat-btn${filePickerDisabled ? " chat-btn--secondary" : ""}`}
                  style={{
                    cursor: filePickerDisabled ? "not-allowed" : "pointer",
                    opacity: filePickerDisabled ? 0.6 : 1,
                  }}
                >
                  {file ? "Choose a different file" : "Choose file"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.markdown,text/markdown"
                    onChange={onFileChange}
                    disabled={filePickerDisabled}
                    style={{ display: "none" }}
                  />
                </label>

                {file && (
                  <div className="gc-form-help" style={{ marginTop: 10 }}>
                    selected: <code>{file.name}</code> ({Math.round(file.size / 1024)} KB)
                    {analyzing && " · analyzing..."}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Confirm suggestion */}
            {suggestion && !result && (
              <div className="gc-form-panel">
                <div className="gc-form-panel__label">2 · confirm target</div>

                {suggestion.retrieved.length > 0 && (
                  <div className="gc-form-field">
                    <label>Engine consulted (folder majority = suggested category)</label>
                    <div className="gc-retrieval-chips">
                      {suggestion.retrieved.map((r) => (
                        <span
                          key={r.path}
                          className="gc-retrieval-chip"
                          title={`${r.path} (score ${r.score})`}
                        >
                          {r.path.split("/").pop()?.replace(/\.mdx?$/, "")}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="gc-form-field">
                  <label>Category (sub-folder)</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={submitting}
                  >
                    {PATTERN_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <div className="gc-form-help">
                    will drop the file at{" "}
                    <code>docs/patterns/{category}/{filename}</code>
                  </div>
                </div>

                <div className="gc-form-field">
                  <label>Filename</label>
                  <input
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    disabled={submitting}
                  />
                  <div className="gc-form-help">
                    lowercase letters, digits, hyphens. must end in .md
                  </div>
                </div>

                <div className="gc-form-field">
                  <label>Short description (shown in the KB table)</label>
                  <input
                    type="text"
                    value={kbDescription}
                    onChange={(e) => setKbDescription(e.target.value)}
                    disabled={submitting}
                    placeholder="One-line summary of what this pattern is for"
                  />
                  <div className="gc-form-help">
                    prepended as <code>description:</code> frontmatter so the KB
                    table row shows something instead of an empty cell
                  </div>
                </div>

                <div className="gc-form-field">
                  <label>PR title</label>
                  <input
                    type="text"
                    value={prTitle}
                    onChange={(e) => setPrTitle(e.target.value)}
                    disabled={submitting}
                  />
                </div>

                <div className="gc-form-field">
                  <label>PR description (optional)</label>
                  <textarea
                    value={prDescription}
                    onChange={(e) => setPrDescription(e.target.value)}
                    disabled={submitting}
                    rows={3}
                  />
                </div>

                <div className="gc-form-panel__actions">
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={!canSubmit}
                    className="chat-btn"
                  >
                    {submitting ? "Opening PR…" : "Open PR"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {result && (
              <div className="gc-form-panel gc-form-panel--success">
                <div className="gc-form-panel__label gc-form-panel__label--success">
                  PR opened
                </div>
                <p style={{ margin: "0 0 14px", fontSize: "0.95rem" }}>
                  File committed to <code>{result.repo}</code> on branch{" "}
                  <code>{result.branch}</code> at path{" "}
                  <code>{result.path}</code>.
                </p>
                <div
                  className="gc-form-panel__actions"
                  style={{ justifyContent: "flex-start" }}
                >
                  <a
                    href={result.pr_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-btn"
                  >
                    Open PR on GitHub →
                  </a>
                  <button
                    type="button"
                    onClick={startOver}
                    className="chat-btn chat-btn--secondary"
                  >
                    Submit another
                  </button>
                </div>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="gc-error-banner">
                <strong style={{ color: "var(--entegris-red)" }}>Error:</strong>{" "}
                {error}
              </div>
            )}

            {/* Footer helper */}
            <div className="gc-form-help" style={{ marginTop: 24 }}>
              Prefer to draft in the app? Use{" "}
              <Link to="/generate/" style={{ color: "var(--entegris-blue)" }}>
                /generate
              </Link>{" "}
              to produce a pattern, copy the markdown, save it as a .md file,
              then come back here to submit it.
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
