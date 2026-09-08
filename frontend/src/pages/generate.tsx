// this file is the /generate page. it's the main UI for the ai4ea engine.
//
// what's in here:
//   - 3 modes the user can pick (pattern, assurance, question)
//   - a chat-style input box where the user types a scenario
//   - a message log that shows what the engine sent back
//   - a small "engine consulted these docs" panel above each answer so the
//     user can see what grep retrieved
//   - clickable links on any doc paths the llm cites in its response
//   - a markdown renderer (further down) that turns the llm's text into html
//
// the file is long because the markdown renderer handles a lot of cases
// (headings, lists, tables, code blocks, mermaid diagrams). the chat ui
// itself is the bottom third of the file.
//
// platform-governed custom code, AMP engineer review required for changes.
// see docs/governance.md and .github/CODEOWNERS.

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Highlight, themes as prismThemes } from "prism-react-renderer";

// where the backend is running. matches what server.ts listens on.
const BACKEND_URL = "http://localhost:3001";

// the three modes the user can pick. matches the Mode type on the backend.
type Mode = "pattern" | "assurance" | "question";

// who sent a given message. user = typed by the human, assistant = from the llm.
type ChatRole = "user" | "assistant";

// shape of the deterministic output checks the backend runs on each llm answer.
// missingSections is only populated for pattern mode; invalidSources is any
// path the llm cited under "## Sources" that isn't a real doc in the corpus.
interface OutputCheck {
  missingSections: string[];
  citedSources: string[];
  invalidSources: string[];
}

// shape of one message in the chat log.
interface ChatMessage {
  id: string;                                                 // unique id so react can track it
  role: ChatRole;                                             // who sent it
  mode: Mode;                                                 // which mode was active when sent
  content: string;                                            // the text body
  pending?: boolean;                                          // true while we're waiting on the llm
  error?: boolean;                                            // true if the request failed
  retrieved?: Array<{ path: string; score: number }>;         // docs grep picked for this answer
  keywords?: string[];                                        // keywords grep used
  checks?: OutputCheck;                                       // structural + citation check results
}

// shape of one mode's config (label, placeholder, examples, etc).
interface ModeConfig {
  id: Mode;
  label: string;
  description: string;
  placeholder: string;
  prefix: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  examples: string[];   // 2-3 click-to-fill scenarios for the empty state
}

// all 3 modes with their config. examples show as clickable chips in the empty
// state so first-time users don't have to invent a scenario.
const MODES: ReadonlyArray<ModeConfig> = [
  {
    id: "pattern",
    label: "Generate Pattern",
    description: "Scenario in, full Entegris architecture pattern out.",
    placeholder:
      "e.g. We need to stream sensor readings from plant-floor OT equipment into our GCP data lake for real-time quality monitoring and anomaly detection.",
    prefix: "[MODE: PATTERN GENERATION]",
    emptyStateTitle: "describe a business scenario",
    emptyStateBody:
      "the engine returns a complete reference architecture pattern (context, architecture principles, canonical patterns, sequence diagrams, sources) grounded in the entegris knowledge base.",
    examples: [
      "we need to ingest customer order events from our sap s/4 system into bigquery in near real-time so the demand planning team can run downstream analytics.",
      "expose a public-facing customer self-service portal that lets customers query their order status from sap, with rate limiting and ddos protection.",
      "deploy a small internal web app on gcp for our finance team to view monthly reports, accessible only from inside our network.",
    ],
  },
  {
    id: "assurance",
    label: "Assurance Review",
    description: "Proposed design in, compliance assessment out.",
    placeholder:
      "e.g. We're planning to put a public-facing FastAPI service in front of our SAP S/4 data, using API Gateway for auth and a Postgres read-replica for caching. Review against our principles, positions, and guardrails.",
    prefix: "[MODE: ASSURANCE REVIEW]",
    emptyStateTitle: "describe your proposed architecture",
    emptyStateBody:
      "the engine assesses it against entegris principles, positions, guardrails, and the architecture checklist, and flags any compliance issues.",
    examples: [
      "we're planning to put a public-facing fastapi service in front of our sap s/4 data, using api gateway for auth and a postgres read-replica for caching.",
      "we want to skip terraform and provision a new gke cluster with gcloud cli scripts because it's faster.",
      "we plan to build a custom crm in-house rather than use a saas product, because we want full control over the data model.",
    ],
  },
  {
    id: "question",
    label: "Ask a Question",
    description: "Freeform Q&A grounded in the existing knowledge base.",
    placeholder:
      "e.g. When should we prefer an event-driven integration over a synchronous API call between SAP and a downstream system?",
    prefix: "[MODE: QUESTION]",
    emptyStateTitle: "ask an architecture question",
    emptyStateBody:
      "freeform questions answered using the entegris patterns, principles, positions, guardrails, and checklist as ground truth.",
    examples: [
      "how many data patterns do we have at entegris?",
      "when should we prefer event-driven integration over a synchronous api call?",
      "what's our position on building custom crm vs buying saas?",
    ],
  },
] as const;

const MODE_BY_ID: Record<Mode, ModeConfig> = MODES.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<Mode, ModeConfig>,
);

// ---------------------------------------------------------------------------
// Markdown rendering
// ---------------------------------------------------------------------------
//
// A small block + inline renderer covering what the LLM actually emits:
// headings, paragraphs, bold/italic/inline-code/links, fenced code blocks
// (Prism-highlighted), Mermaid diagrams, tables, ordered/unordered lists,
// blockquotes, and horizontal rules. Intentionally not a full CommonMark
// implementation — kept narrow so it stays reviewable.

type Block =
  | { kind: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "code"; lang: string; code: string }
  | { kind: "mermaid"; code: string }
  | { kind: "list"; ordered: boolean; items: Array<string> }
  | { kind: "table"; headers: Array<string>; rows: Array<Array<string>> }
  | { kind: "quote"; text: string }
  | { kind: "hr" };

function parseMarkdown(src: string): Array<Block> {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Array<Block> = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Fenced code block: ```lang ... ```
    const fence = line.match(/^```\s*([\w-]*)\s*$/);
    if (fence) {
      const lang = fence[1] ?? "";
      const buf: Array<string> = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        buf.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1; // consume closing fence
      const code = buf.join("\n");
      if (lang === "mermaid") {
        blocks.push({ kind: "mermaid", code });
      } else {
        blocks.push({ kind: "code", lang, code });
      }
      continue;
    }

    // ATX heading
    const heading = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
    if (heading) {
      const level = heading[1].length as 1 | 2 | 3 | 4 | 5 | 6;
      blocks.push({ kind: "heading", level, text: heading[2] });
      i += 1;
      continue;
    }

    // Horizontal rule
    if (/^\s*(\*\s*\*\s*\*+|-\s*-\s*-+|_\s*_\s*_+)\s*$/.test(line)) {
      blocks.push({ kind: "hr" });
      i += 1;
      continue;
    }

    // Table: header row + separator row of dashes
    if (line.trim().startsWith("|") && i + 1 < lines.length && /^\s*\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?\s*$/.test(lines[i + 1])) {
      const headers = splitTableRow(line);
      const rows: Array<Array<string>> = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push({ kind: "table", headers, rows });
      continue;
    }

    // List (unordered: -/* , ordered: 1. )
    const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (listMatch) {
      const ordered = /^\d+\./.test(listMatch[2]);
      const items: Array<string> = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (!m) {
          // Continuation of previous item (indented non-empty line).
          if (items.length > 0 && /^\s+\S/.test(lines[i])) {
            items[items.length - 1] += " " + lines[i].trim();
            i += 1;
            continue;
          }
          break;
        }
        const itemOrdered = /^\d+\./.test(m[2]);
        if (itemOrdered !== ordered) break;
        items.push(m[3]);
        i += 1;
      }
      blocks.push({ kind: "list", ordered, items });
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const buf: Array<string> = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push({ kind: "quote", text: buf.join(" ") });
      continue;
    }

    // Paragraph: gather contiguous non-empty, non-special lines
    const para: Array<string> = [line];
    i += 1;
    while (i < lines.length) {
      const peek = lines[i];
      if (peek.trim() === "") break;
      if (/^#{1,6}\s+/.test(peek)) break;
      if (/^```/.test(peek)) break;
      if (/^>\s?/.test(peek)) break;
      if (/^(\s*)([-*]|\d+\.)\s+/.test(peek)) break;
      if (peek.trim().startsWith("|")) break;
      para.push(peek);
      i += 1;
    }
    blocks.push({ kind: "paragraph", text: para.join(" ") });
  }

  return blocks;
}

function splitTableRow(line: string): Array<string> {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((c) => c.trim());
}

// Inline tokenizer: handles **bold**, *italic*, _italic_, `code`, [text](url).
type Inline =
  | { kind: "text"; value: string }
  | { kind: "bold"; children: Array<Inline> }
  | { kind: "italic"; children: Array<Inline> }
  | { kind: "code"; value: string }
  | { kind: "link"; href: string; children: Array<Inline> };

function parseInline(src: string): Array<Inline> {
  const out: Array<Inline> = [];
  let i = 0;
  let buf = "";
  const flush = () => {
    if (buf) {
      out.push({ kind: "text", value: buf });
      buf = "";
    }
  };

  while (i < src.length) {
    const ch = src[i];

    if (ch === "`") {
      const end = src.indexOf("`", i + 1);
      if (end !== -1) {
        flush();
        out.push({ kind: "code", value: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    if (ch === "*" && src[i + 1] === "*") {
      const end = src.indexOf("**", i + 2);
      if (end !== -1) {
        flush();
        out.push({ kind: "bold", children: parseInline(src.slice(i + 2, end)) });
        i = end + 2;
        continue;
      }
    }

    if (ch === "*" || ch === "_") {
      // Avoid matching inside words (e.g. snake_case).
      const prev = src[i - 1];
      const isBoundary = i === 0 || /[\s([{,.;:!?]/.test(prev);
      if (isBoundary) {
        const end = src.indexOf(ch, i + 1);
        if (end !== -1 && end !== i + 1) {
          flush();
          out.push({ kind: "italic", children: parseInline(src.slice(i + 1, end)) });
          i = end + 1;
          continue;
        }
      }
    }

    if (ch === "[") {
      const close = src.indexOf("]", i + 1);
      if (close !== -1 && src[close + 1] === "(") {
        const urlEnd = src.indexOf(")", close + 2);
        if (urlEnd !== -1) {
          flush();
          out.push({
            kind: "link",
            href: src.slice(close + 2, urlEnd),
            children: parseInline(src.slice(i + 1, close)),
          });
          i = urlEnd + 1;
          continue;
        }
      }
    }

    buf += ch;
    i += 1;
  }
  flush();
  return out;
}

function renderInline(nodes: Array<Inline>): ReactNode {
  return nodes.map((node, idx) => {
    switch (node.kind) {
      case "text":
        return <span key={idx}>{node.value}</span>;
      case "bold":
        return <strong key={idx}>{renderInline(node.children)}</strong>;
      case "italic":
        return <em key={idx}>{renderInline(node.children)}</em>;
      case "code": {
        // most inline code is just text. but the llm cites kb doc paths in
        // backticks (like `docs/patterns/data/data-ingestion-pattern.md`).
        // if we detect that shape, render it as a clickable link to the docs
        // page so reviewers can click straight to the source.
        const docMatch = /^docs\/[a-z0-9_./-]+\.mdx?$/i.exec(node.value);
        if (docMatch) {
          // turn "docs/patterns/data/data-ingestion-pattern.md" into
          // "/docs/patterns/data/data-ingestion-pattern/" which is the
          // docusaurus url for that page.
          const href = "/" + node.value.replace(/\.mdx?$/, "") + "/";
          return (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--ifm-code-background)",
                padding: "1px 6px",
                borderRadius: 2,
                fontFamily: "var(--ifm-font-family-monospace)",
                fontSize: "0.88em",
                color: "var(--entegris-blue)",
                textDecoration: "none",
                borderBottom: "1px dotted var(--entegris-blue)",
              }}
              title="open this kb document in a new tab"
            >
              {node.value}
            </a>
          );
        }
        // not a doc path, render as plain inline code.
        return (
          <code
            key={idx}
            style={{
              background: "var(--ifm-code-background)",
              padding: "1px 6px",
              borderRadius: 2,
              fontFamily: "var(--ifm-font-family-monospace)",
              fontSize: "0.88em",
            }}
          >
            {node.value}
          </code>
        );
      }
      case "link":
        return (
          <a
            key={idx}
            href={node.href}
            target={node.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{ color: "var(--entegris-blue)" }}
          >
            {renderInline(node.children)}
          </a>
        );
    }
  });
}

// ---------------------------------------------------------------------------
// Mermaid diagram (dynamic import — mermaid is resolved from the
// @docusaurus/theme-mermaid transitive, so no new package.json entry).
// ---------------------------------------------------------------------------

let mermaidInitPromise: Promise<typeof import("mermaid").default> | null = null;

function loadMermaid(): Promise<typeof import("mermaid").default> {
  if (!mermaidInitPromise) {
    mermaidInitPromise = import("mermaid").then((mod) => {
      const m = mod.default;
      m.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        fontFamily: "Open Sans, Arial, sans-serif",
        themeVariables: {
          primaryColor: "#F7F5F5",
          primaryBorderColor: "#7F7773",
          primaryTextColor: "#393630",
          lineColor: "#7F7773",
          secondaryColor: "#ECE9E7",
          tertiaryColor: "#FFFFFF",
        },
      });
      return m;
    });
  }
  return mermaidInitPromise;
}

function MermaidDiagram({ code }: { code: string }): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const idRef = useRef(`m-${Math.random().toString(36).slice(2, 10)}`);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const mermaid = await loadMermaid();
        const { svg } = await mermaid.render(idRef.current, code);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Mermaid render failed");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--entegris-medium-gray)",
            marginBottom: 4,
          }}
        >
          Mermaid render failed — showing source.
        </div>
        <CodeBlock code={code} lang="mermaid" />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="docusaurus-mermaid-container"
      style={{ margin: "0 0 0.75rem", padding: 16 }}
    />
  );
}

// ---------------------------------------------------------------------------
// Code block (Prism-highlighted via existing prism-react-renderer dep)
// ---------------------------------------------------------------------------

function CodeBlock({ code, lang }: { code: string; lang: string }): ReactNode {
  const language = (lang || "text").toLowerCase();
  return (
    <Highlight code={code.replace(/\n$/, "")} language={language} theme={prismThemes.oneLight}>
      {({ tokens, getLineProps, getTokenProps, style }) => (
        <pre
          style={{
            ...style,
            background: "var(--ifm-pre-background)",
            padding: "0.85rem 1rem",
            borderRadius: 2,
            fontSize: "0.82rem",
            lineHeight: 1.55,
            margin: "0 0 0.75rem",
            overflowX: "auto",
            fontFamily: "var(--ifm-font-family-monospace)",
          }}
        >
          {tokens.map((line, i) => {
            const { key: _lk, ...lineProps } = getLineProps({ line });
            return (
              <div key={i} {...lineProps}>
                {line.map((token, j) => {
                  const { key: _tk, ...tokenProps } = getTokenProps({ token });
                  return <span key={j} {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}

// ---------------------------------------------------------------------------
// Block renderer
// ---------------------------------------------------------------------------

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.kind) {
    case "heading": {
      const sizes: Record<number, string> = {
        1: "1.45rem",
        2: "1.2rem",
        3: "1.05rem",
        4: "0.98rem",
        5: "0.92rem",
        6: "0.88rem",
      };
      const style: CSSProperties = {
        fontSize: sizes[block.level],
        fontWeight: 600,
        margin: block.level <= 2 ? "1rem 0 0.5rem" : "0.85rem 0 0.4rem",
        lineHeight: 1.3,
        color: "var(--entegris-dark-gray)",
        borderBottom: block.level === 1 ? "1px solid var(--entegris-bg-alt)" : undefined,
        paddingBottom: block.level === 1 ? "0.35rem" : undefined,
      };
      const inner = renderInline(parseInline(block.text));
      switch (block.level) {
        case 1: return <h1 key={key} style={style}>{inner}</h1>;
        case 2: return <h2 key={key} style={style}>{inner}</h2>;
        case 3: return <h3 key={key} style={style}>{inner}</h3>;
        case 4: return <h4 key={key} style={style}>{inner}</h4>;
        case 5: return <h5 key={key} style={style}>{inner}</h5>;
        case 6: return <h6 key={key} style={style}>{inner}</h6>;
      }
      return null;
    }
    case "paragraph":
      return (
        <p key={key} style={{ margin: "0 0 0.65rem", lineHeight: 1.6 }}>
          {renderInline(parseInline(block.text))}
        </p>
      );
    case "code":
      return <CodeBlock key={key} code={block.code} lang={block.lang} />;
    case "mermaid":
      return <MermaidDiagram key={key} code={block.code} />;
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={key} style={{ margin: "0 0 0.65rem", paddingLeft: "1.4rem" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ marginBottom: "0.25rem", lineHeight: 1.55 }}>
              {renderInline(parseInline(item))}
            </li>
          ))}
        </Tag>
      );
    }
    case "table":
      return (
        <div key={key} style={{ overflowX: "auto", margin: "0 0 0.75rem" }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: "0.88rem",
              border: "1px solid var(--entegris-bg-alt)",
            }}
          >
            <thead>
              <tr style={{ background: "var(--entegris-bg-light)" }}>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "8px 12px",
                      borderBottom: "1px solid var(--entegris-bg-alt)",
                      textAlign: "left",
                      fontWeight: 600,
                    }}
                  >
                    {renderInline(parseInline(h))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "8px 12px",
                        borderBottom: "1px solid var(--entegris-bg-alt)",
                        verticalAlign: "top",
                      }}
                    >
                      {renderInline(parseInline(cell))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={key}
          style={{
            margin: "0 0 0.75rem",
            padding: "0.5rem 0.9rem",
            background: "var(--entegris-bg-light)",
            borderLeft: "3px solid var(--entegris-red)",
            color: "var(--entegris-dark-gray)",
            fontStyle: "normal",
          }}
        >
          {renderInline(parseInline(block.text))}
        </blockquote>
      );
    case "hr":
      return (
        <hr
          key={key}
          style={{
            border: 0,
            borderTop: "1px solid var(--entegris-bg-alt)",
            margin: "0.75rem 0",
          }}
        />
      );
  }
}

// ---------------------------------------------------------------------------
// Markdown -> HTML string (for .doc export). Reuses the same parseMarkdown /
// parseInline the on-screen renderer uses so exports match what the user
// saw. Only for export - the on-screen React version stays the source of
// truth for actual display.
// ---------------------------------------------------------------------------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function inlineToHtml(nodes: Array<Inline>): string {
  return nodes
    .map((n) => {
      switch (n.kind) {
        case "text":
          return escapeHtml(n.value);
        case "bold":
          return `<strong>${inlineToHtml(n.children)}</strong>`;
        case "italic":
          return `<em>${inlineToHtml(n.children)}</em>`;
        case "code":
          return `<code>${escapeHtml(n.value)}</code>`;
        case "link":
          return `<a href="${escapeHtml(n.href)}">${inlineToHtml(n.children)}</a>`;
      }
    })
    .join("");
}

function blocksToHtml(blocks: Array<Block>): string {
  return blocks
    .map((b) => {
      switch (b.kind) {
        case "heading":
          return `<h${b.level}>${inlineToHtml(parseInline(b.text))}</h${b.level}>`;
        case "paragraph":
          return `<p>${inlineToHtml(parseInline(b.text))}</p>`;
        case "code":
          return `<pre><code>${escapeHtml(b.code)}</code></pre>`;
        case "mermaid":
          // Word can't render Mermaid. Keep the source as a code block so a
          // reviewer can rebuild the diagram elsewhere if they need to.
          return `<p><em>[Mermaid diagram - source below]</em></p><pre><code>${escapeHtml(b.code)}</code></pre>`;
        case "list": {
          const tag = b.ordered ? "ol" : "ul";
          const items = b.items
            .map((i) => `<li>${inlineToHtml(parseInline(i))}</li>`)
            .join("");
          return `<${tag}>${items}</${tag}>`;
        }
        case "table": {
          const thead = `<thead><tr>${b.headers
            .map((h) => `<th>${inlineToHtml(parseInline(h))}</th>`)
            .join("")}</tr></thead>`;
          const tbody = `<tbody>${b.rows
            .map(
              (r) =>
                `<tr>${r
                  .map((c) => `<td>${inlineToHtml(parseInline(c))}</td>`)
                  .join("")}</tr>`,
            )
            .join("")}</tbody>`;
          return `<table>${thead}${tbody}</table>`;
        }
        case "quote":
          return `<blockquote>${inlineToHtml(parseInline(b.text))}</blockquote>`;
        case "hr":
          return `<hr/>`;
      }
    })
    .join("\n");
}

// ---------------------------------------------------------------------------
// Download helpers. .md is a straight blob of the raw response markdown.
// .doc is the markdown parsed into HTML then wrapped in a Word-openable
// template. Word opens it as a proper formatted document (tables, headings,
// lists all preserved). Technically it's .doc (older format) not .docx, but
// Word/Google Docs/LibreOffice all handle it fine and users don't notice.
// ---------------------------------------------------------------------------

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function slugForDownload(source: string, fallback: string): string {
  // use the first H1 as the filename base; fall back to the mode name.
  const h1 = source.match(/^# (.+)$/m);
  const raw = (h1?.[1] ?? fallback).trim();
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "ai4ea-response";
}

function downloadMarkdown(source: string, fallback: string): void {
  const filename = `${slugForDownload(source, fallback)}.md`;
  const blob = new Blob([source], { type: "text/markdown;charset=utf-8" });
  triggerDownload(blob, filename);
}

function downloadDoc(source: string, fallback: string): void {
  const filename = `${slugForDownload(source, fallback)}.doc`;
  const bodyHtml = blocksToHtml(parseMarkdown(source));
  const wordDoc = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>${escapeHtml(filename)}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #222; }
  h1 { font-size: 20pt; }
  h2 { font-size: 15pt; }
  h3 { font-size: 12.5pt; }
  h4, h5, h6 { font-size: 11.5pt; }
  table { border-collapse: collapse; margin: 10px 0; }
  th, td { border: 1px solid #999; padding: 6px 8px; vertical-align: top; }
  th { background: #f2f2f2; text-align: left; }
  code { font-family: Consolas, monospace; background: #f5f5f5; padding: 1px 4px; }
  pre { background: #f5f5f5; padding: 8px; font-family: Consolas, monospace; }
  blockquote { border-left: 3px solid #ccc; padding-left: 10px; color: #555; }
  hr { border: none; border-top: 1px solid #ccc; }
</style>
</head>
<body>${bodyHtml}</body>
</html>`;
  // '﻿' BOM helps some Word versions detect the charset.
  const blob = new Blob(["﻿" + wordDoc], {
    type: "application/msword",
  });
  triggerDownload(blob, filename);
}

// ---------------------------------------------------------------------------
// Quality score. Aggregates the 3 existing check signals into one letter
// grade so users see the trust signal at a glance instead of scanning
// three separate banners.
// ---------------------------------------------------------------------------

type QualitySignal = {
  grade: "A" | "B" | "C" | "D" | "F";
  color: string;
  score: number;
  issues: string[];
};

function computeQuality(
  checks: OutputCheck | undefined,
  retrieved: Array<{ path: string; score: number }> | undefined,
): QualitySignal {
  let score = 100;
  const issues: string[] = [];

  if (checks) {
    if (checks.missingSections.length > 0) {
      const n = checks.missingSections.length;
      score -= 20 * n;
      issues.push(`${n} missing section${n > 1 ? "s" : ""}`);
    }
    if (checks.invalidSources.length > 0) {
      const n = checks.invalidSources.length;
      score -= 15 * n;
      issues.push(`${n} invalid citation${n > 1 ? "s" : ""}`);
    }
  }

  if (retrieved) {
    if (retrieved.length === 0) {
      score -= 30;
      issues.push("no topical retrieval");
    } else if ((retrieved[0]?.score ?? 0) < 5) {
      score -= 15;
      issues.push("weak retrieval");
    }
  }

  score = Math.max(0, Math.min(100, score));

  let grade: QualitySignal["grade"];
  let color: string;
  if (score >= 90) {
    grade = "A";
    color = "#3fa76a";
  } else if (score >= 80) {
    grade = "B";
    color = "#3fa76a";
  } else if (score >= 70) {
    grade = "C";
    color = "#c78a1a";
  } else if (score >= 60) {
    grade = "D";
    color = "#c78a1a";
  } else {
    grade = "F";
    color = "var(--entegris-red)";
  }

  return { grade, color, score, issues };
}

function MarkdownView({ source }: { source: string }): ReactNode {
  const blocks = useMemo(() => parseMarkdown(source), [source]);
  return <>{blocks.map((b, i) => renderBlock(b, i))}</>;
}

// ---------------------------------------------------------------------------
// Chat UI
// ---------------------------------------------------------------------------

function TypingIndicator(): ReactNode {
  const dotStyle: CSSProperties = {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--entegris-medium-gray)",
    margin: "0 2px",
    animation: "ai4ea-bounce 1.2s infinite ease-in-out",
  };
  return (
    <div style={{ display: "flex", alignItems: "center", height: 18 }} aria-label="Assistant is typing">
      <span style={{ ...dotStyle, animationDelay: "0s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.18s" }} />
      <span style={{ ...dotStyle, animationDelay: "0.36s" }} />
    </div>
  );
}

function CopyButton({ text }: { text: string }): ReactNode {
  const [copied, setCopied] = useState(false);
  const onClick = useCallback(() => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => undefined);
  }, [text]);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Copy raw markdown"
      style={{
        background: "transparent",
        border: "1px solid var(--entegris-bg-alt)",
        color: "var(--entegris-medium-gray)",
        borderRadius: 2,
        padding: "2px 8px",
        fontSize: "0.74rem",
        fontFamily: "var(--ifm-font-family-base)",
        cursor: "pointer",
        lineHeight: 1.4,
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ModeBadge({ mode }: { mode: Mode }): ReactNode {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.66rem",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--entegris-medium-gray)",
        border: "1px solid var(--entegris-bg-alt)",
        borderRadius: 2,
        padding: "2px 6px",
      }}
    >
      {MODE_BY_ID[mode].label}
    </span>
  );
}

// small panel that shows "engine consulted these docs" above an assistant
// answer. each doc is a clickable link to the kb page. this is the
// transparency feature, it shows the user what grep retrieved so the engine
// doesn't feel like a black box.
function RetrievalChips({
  retrieved,
}: {
  retrieved: Array<{ path: string; score: number }>;
}): ReactNode {
  // if grep didn't pick anything, don't render anything.
  if (retrieved.length === 0) return null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--entegris-bg-alt)",
        borderLeft: "3px solid var(--entegris-blue)",
        borderRadius: 2,
        padding: "8px 12px",
        marginBottom: 8,
        maxWidth: "100%",
      }}
    >
      {/* tiny header label */}
      <div
        style={{
          color: "var(--entegris-medium-gray)",
          fontSize: "0.66rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        engine consulted
      </div>

      {/* the chip row. each doc path becomes a clickable link. */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {retrieved.map((r) => {
          // turn "patterns/data/data-ingestion-pattern.md" into
          // "/docs/patterns/data/data-ingestion-pattern/" for docusaurus.
          const href = "/docs/" + r.path.replace(/\.mdx?$/, "") + "/";

          // the chip label is just the last segment of the path with the
          // extension stripped, so it's readable. eg "data-ingestion-pattern".
          const label = r.path.split("/").pop()?.replace(/\.mdx?$/, "") ?? r.path;

          return (
            <a
              key={r.path}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={`docs/${r.path} (match score ${r.score})`}
              style={{
                background: "var(--entegris-bg-light)",
                border: "1px solid var(--entegris-bg-alt)",
                borderRadius: 2,
                color: "var(--entegris-dark-gray)",
                fontSize: "0.76rem",
                padding: "3px 8px",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// small banner that warns the reviewer when topical retrieval was weak or
// nonexistent, so a "confident-looking" response doesn't get trusted when the
// engine had little to ground it on. three states:
//   - top match score >= WEAK_RETRIEVAL_THRESHOLD: renders nothing (retrieval
//     was strong; no warning needed).
//   - top match score < WEAK_RETRIEVAL_THRESHOLD: amber caution banner
//     showing the top score, telling the reviewer to double-check sources.
//   - retrieved is empty: stronger message that the response is grounded only
//     in foundational context (principles, guardrails, template, checklist).
//
// this addresses the "what if user prompts poorly, gets wrong docs, response
// looks confident anyway" failure mode. we can't prevent the retrieval, but
// we can make the shakiness visible so the reviewer's guard goes up.
const WEAK_RETRIEVAL_THRESHOLD = 5.0;

function RetrievalStrengthBanner({
  retrieved,
}: {
  retrieved: Array<{ path: string; score: number }>;
}): ReactNode {
  const topScore = retrieved[0]?.score ?? 0;

  if (retrieved.length === 0) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--entegris-bg-alt)",
          borderLeft: "3px solid #c78a1a",
          borderRadius: 2,
          padding: "8px 12px",
          marginBottom: 8,
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            color: "#c78a1a",
            fontSize: "0.66rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            marginBottom: 6,
            textTransform: "uppercase",
          }}
        >
          No topical documents matched
        </div>
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--entegris-dark-gray)",
            lineHeight: 1.5,
          }}
        >
          The response is grounded only in foundational context (principles,
          guardrails, template, checklist). Consider rephrasing the scenario
          with more specific vocabulary before trusting the output.
        </div>
      </div>
    );
  }

  if (topScore >= WEAK_RETRIEVAL_THRESHOLD) {
    return null;
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--entegris-bg-alt)",
        borderLeft: "3px solid #c78a1a",
        borderRadius: 2,
        padding: "8px 12px",
        marginBottom: 8,
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          color: "#c78a1a",
          fontSize: "0.66rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        Weak retrieval
      </div>
      <div
        style={{
          fontSize: "0.78rem",
          color: "var(--entegris-dark-gray)",
          lineHeight: 1.5,
        }}
      >
        Top match scored {topScore.toFixed(1)} (a strong match usually scores
        above {WEAK_RETRIEVAL_THRESHOLD.toFixed(1)}). Please double-check the
        sources below before trusting the output.
      </div>
    </div>
  );
}

// small banner that surfaces the backend's deterministic output checks above
// an assistant answer. two visual states:
//   - "passed" (missingSections + invalidSources both empty): a subtle green
//     dot + one line of text. reassurance without dominating the UI.
//   - "flagged" (either list is non-empty): a red-left-bordered panel listing
//     the specific problems, styled to match RetrievalChips's aesthetic so
//     the two panels sit visually together above the response.
//
// this is what turns the checkOutput() audit from a backend log line into a
// visible governance signal for the reviewer. clean output stays quiet; a
// missing "## Sources" section or a fabricated citation becomes obvious.
function ChecksBanner({ checks }: { checks: OutputCheck }): ReactNode {
  const passed =
    checks.missingSections.length === 0 && checks.invalidSources.length === 0;

  if (passed) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.72rem",
          color: "var(--entegris-medium-gray)",
          marginBottom: 8,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#3fa76a",
          }}
        />
        Structural and citation checks passed
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--entegris-bg-alt)",
        borderLeft: "3px solid var(--entegris-red)",
        borderRadius: 2,
        padding: "8px 12px",
        marginBottom: 8,
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          color: "var(--entegris-red)",
          fontSize: "0.66rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        Output check flagged
      </div>

      {checks.missingSections.length > 0 && (
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--entegris-dark-gray)",
            marginBottom: checks.invalidSources.length > 0 ? 4 : 0,
            lineHeight: 1.5,
          }}
        >
          <strong>Missing sections:</strong> {checks.missingSections.join(", ")}
        </div>
      )}

      {checks.invalidSources.length > 0 && (
        <div
          style={{
            fontSize: "0.78rem",
            color: "var(--entegris-dark-gray)",
            lineHeight: 1.5,
          }}
        >
          <strong>Invalid citations:</strong>{" "}
          {checks.invalidSources.map((path, i) => (
            <span key={path}>
              <code
                style={{
                  background: "var(--ifm-code-background)",
                  padding: "1px 6px",
                  borderRadius: 2,
                  fontFamily: "var(--ifm-font-family-monospace)",
                  fontSize: "0.88em",
                }}
              >
                {path}
              </code>
              {i < checks.invalidSources.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// one message in the chat log. user messages are right-aligned bubbles,
// assistant messages are left-aligned and (for pattern mode) wider so the
// pattern document doesn't get cramped.
function MessageBubble({ message }: { message: ChatMessage }): ReactNode {
  const isUser = message.role === "user";

  // user messages: right-aligned tinted bubble, plain text.
  if (isUser) {
    return (
      <div className="chat-row chat-row--user">
        <div className="chat-bubble--user">{message.content}</div>
      </div>
    );
  }

  // assistant messages: no bubble, full-width column with a small label,
  // then any retrieval/check chrome, then the rendered response, then a
  // toolbar of utility buttons (copy + downloads).
  const showResult =
    !message.pending && !message.error && message.content.trim() !== "";
  const quality = showResult
    ? computeQuality(message.checks, message.retrieved)
    : null;
  const modeLabel = MODE_BY_ID[message.mode].label;

  return (
    <div className="chat-row chat-row--assistant">
      <div className="chat-assistant__label">
        <span className="chat-assistant__badge">AI4EA</span>
        <span>{modeLabel}</span>
        {quality && (
          <span
            className="chat-quality"
            style={{ background: quality.color }}
            title={
              quality.issues.length > 0
                ? `Quality ${quality.score}/100 - ${quality.issues.join(", ")}`
                : `Quality ${quality.score}/100 - all checks passed`
            }
          >
            {quality.grade}
          </span>
        )}
      </div>

      {message.pending ? (
        <TypingIndicator />
      ) : message.error ? (
        <div className="chat-error">{message.content}</div>
      ) : (
        <>
          {message.retrieved && (
            <RetrievalChips retrieved={message.retrieved} />
          )}
          {message.retrieved && (
            <RetrievalStrengthBanner retrieved={message.retrieved} />
          )}
          {message.checks && <ChecksBanner checks={message.checks} />}

          <div className="chat-response">
            <MarkdownView source={message.content} />
          </div>

          {showResult && (
            <div className="chat-toolbar">
              <CopyButton text={message.content} />
              <button
                type="button"
                className="chat-toolbar__btn"
                onClick={() => downloadMarkdown(message.content, modeLabel)}
                title="Download the raw markdown"
              >
                ↓ .md
              </button>
              <button
                type="button"
                className="chat-toolbar__btn"
                onClick={() => downloadDoc(message.content, modeLabel)}
                title="Download as a Word-openable .doc"
              >
                ↓ Word
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ModeSelector({
  value,
  onChange,
  disabled,
}: {
  value: Mode;
  onChange: (m: Mode) => void;
  disabled: boolean;
}): ReactNode {
  return (
    <div className="chat-mode-track" role="tablist" aria-label="Conversation mode">
      {MODES.map((m) => {
        const active = m.id === value;
        return (
          <button
            key={m.id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(m.id)}
            disabled={disabled}
            title={m.description}
            className={`chat-mode-pill${active ? " chat-mode-pill--active" : ""}`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}

// empty state shown when there are no messages yet. big centered greeting,
// mode selector as pills, then click-to-fill example scenarios. inspired by
// the empty states in claude / chatgpt / gemini / copilot.
function EmptyState({
  mode,
  onModeChange,
  onPickExample,
  loading,
}: {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  onPickExample: (example: string) => void;
  loading: boolean;
}): ReactNode {
  const cfg = MODE_BY_ID[mode];

  return (
    <div className="chat-empty">
      <h1 className="chat-empty__greeting">How can I help you draft?</h1>
      <p className="chat-empty__subtitle">
        AI4EA drafts reference architectures, runs assurance reviews, and
        answers questions grounded in the Entegris knowledge base.
      </p>

      <ModeSelector value={mode} onChange={onModeChange} disabled={loading} />

      <div className="chat-empty__examples-label">try one of these</div>
      <div className="chat-empty__examples">
        {cfg.examples.map((example, i) => (
          <button
            key={i}
            type="button"
            className="chat-example-card"
            onClick={() => onPickExample(example)}
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// small banner shown at the top of /generate when the site was built with
// AI4EA_DEMO_MODE=true (gh pages public demo). explains why generation is
// disabled and points visitors at the knowledge base which they CAN browse.
function DemoModeBanner(): ReactNode {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--entegris-bg-alt)",
        borderLeft: "3px solid var(--entegris-red)",
        borderRadius: 2,
        padding: "12px 16px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          color: "var(--entegris-red)",
          fontSize: "0.72rem",
          fontWeight: 600,
          letterSpacing: "0.18em",
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        Public demo
      </div>
      <div
        style={{
          fontSize: "0.9rem",
          color: "var(--entegris-dark-gray)",
          lineHeight: 1.55,
        }}
      >
        Generation is disabled in this public demo. The full app runs on
        Entegris internal infrastructure with LLM access behind sign-in.
        Browse the{" "}
        <Link to="/knowledge-base/" style={{ color: "var(--entegris-blue)" }}>
          knowledge base
        </Link>{" "}
        to see the corpus the engine draws from, or click one of the example
        scenarios below to see the intended flow.
      </div>
    </div>
  );
}

export default function GeneratePage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const demoMode = Boolean(siteConfig.customFields?.demoMode);

  const [mode, setMode] = useState<Mode>("pattern");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<ChatMessage>>([]);
  const [loading, setLoading] = useState(false);

  const logRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    autoResize(textareaRef.current);
  }, [input]);

  // send the current input to the backend and stream the response into the log.
  // does a few things:
  //   1. immediately adds two messages (user msg + a pending assistant msg)
  //      so the user sees something right away.
  //   2. POSTs to /generate with the scenario text (prefixed with the mode tag).
  //   3. when the response comes back, fills in the assistant message with
  //      either the content (success) or an error message (failure).
  //   4. also captures the retrieved docs + keywords so we can show the
  //      "engine consulted" panel above the answer.
  const send = useCallback(async () => {
    // trim the input so we don't send empty whitespace.
    const trimmed = input.trim();

    // bail if there's nothing to send or we're already busy.
    if (!trimmed || loading) return;

    // build the user message that goes into the log.
    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      mode,
      content: trimmed,
    };

    // placeholder assistant message that shows "typing..." while we wait.
    const assistantMsg: ChatMessage = {
      id: uid(),
      role: "assistant",
      mode,
      content: "",
      pending: true,
    };

    // add both to the log at once. clear the input. mark loading.
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setLoading(true);

    // prepend the mode tag so the backend knows which mode to use.
    const payloadScenario = `${MODE_BY_ID[mode].prefix}\n\n${trimmed}`;

    try {
      // POST to the backend. it'll return either { pattern, mode, retrieved, keywords }
      // on success or { error } on failure.
      const res = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: payloadScenario }),
      });

      // parse the response body as json. type matches the server's response shape.
      const data = (await res.json()) as {
        pattern?: string;
        error?: string;
        mode?: Mode;
        retrieved?: Array<{ path: string; score: number }>;
        keywords?: string[];
        checks?: OutputCheck;
      };

      // update the placeholder assistant message with the real result.
      setMessages((prev) =>
        prev.map((m) => {
          // only touch the message we just added. leave everything else alone.
          if (m.id !== assistantMsg.id) return m;

          // request failed or server returned an error object.
          if (!res.ok || data.error) {
            return {
              ...m,
              pending: false,
              error: true,
              content: data.error ?? `request failed (${res.status})`,
            };
          }

          // success. fill in the content + the retrieval info that the
          // RetrievalChips panel uses + the deterministic check results the
          // ChecksBanner surfaces.
          return {
            ...m,
            pending: false,
            content: data.pattern ?? "",
            retrieved: data.retrieved ?? [],
            keywords: data.keywords ?? [],
            checks: data.checks,
          };
        }),
      );
    } catch (err) {
      // network error or the backend was down. show a useful message.
      const msg = err instanceof Error ? err.message : "network error, is the backend running on :3001?";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id ? { ...m, pending: false, error: true, content: msg } : m,
        ),
      );
    } finally {
      // always unlock the input box, whether we succeeded or failed.
      setLoading(false);
    }
  }, [input, loading, mode]);

  // when the user clicks an example chip in the empty state, drop the
  // example text into the input box and focus the textarea so they can edit.
  const pickExample = useCallback((example: string) => {
    setInput(example);
    // small timeout so the state update lands before we try to focus.
    setTimeout(() => textareaRef.current?.focus(), 0);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        void send();
      }
    },
    [send],
  );

  const clearConversation = useCallback(() => {
    if (loading) return;
    setMessages([]);
  }, [loading]);

  const canSubmit = input.trim().length > 0 && !loading && !demoMode;

  const hasMessages = messages.length > 0;

  return (
    <Layout
      title="AI4EA — Enterprise Architecture Assistant"
      description="Generate Entegris architecture patterns, run assurance reviews, and ask architecture questions."
    >
      <style>{INLINE_KEYFRAMES}</style>
      <main className="chat-page">
        {demoMode && (
          <div style={{ padding: "12px 24px 0" }}>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
              <DemoModeBanner />
            </div>
          </div>
        )}

        {/* Top bar: only visible once a conversation has started. Keeps the
            empty state as clean as possible. */}
        {hasMessages && (
          <div className="chat-topbar">
            <div className="chat-topbar__inner">
              <button
                type="button"
                className="chat-topbar__new"
                onClick={clearConversation}
                disabled={loading}
              >
                + New conversation
              </button>
            </div>
          </div>
        )}

        {/* Scrolling middle area */}
        <div
          ref={logRef}
          className="chat-scroll"
          aria-live="polite"
          aria-busy={loading}
        >
          <div className="chat-scroll__inner">
            {!hasMessages ? (
              <EmptyState
                mode={mode}
                onModeChange={setMode}
                onPickExample={pickExample}
                loading={loading}
              />
            ) : (
              messages.map((m) => <MessageBubble key={m.id} message={m} />)
            )}
          </div>
        </div>

        {/* Sticky composer at the bottom */}
        <div className="chat-composer">
          <div className="chat-composer__inner">
            <div className="chat-composer__field">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder={
                  demoMode
                    ? "Generation disabled in public demo"
                    : MODE_BY_ID[mode].placeholder
                }
                disabled={loading || demoMode}
                className="chat-composer__textarea"
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={!canSubmit}
                className="chat-composer__send"
                aria-label="Send message"
                title="Send (⌘/Ctrl + Enter)"
              >
                {loading ? "…" : "↑"}
              </button>
            </div>
            <div className="chat-composer__meta">
              {/* mode selector shown inline in the composer once a chat is
                  active. keeps the empty-state greeting uncluttered. */}
              {hasMessages ? (
                <div className="chat-composer__mode-inline">
                  {MODES.map((m) => {
                    const active = m.id === mode;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMode(m.id)}
                        disabled={loading}
                        title={m.description}
                        className={`chat-mode-pill${active ? " chat-mode-pill--active" : ""}`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <span />
              )}
              <span>
                {demoMode
                  ? "Public demo — generation disabled"
                  : loading
                  ? "Generating…"
                  : "⌘/Ctrl + Enter to send"}
              </span>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function autoResize(el: HTMLTextAreaElement | null): void {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
}

const INLINE_KEYFRAMES = `
@keyframes ai4ea-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-4px); opacity: 1; }
}
`;
