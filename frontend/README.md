# AI4EA frontend

Docusaurus 3.10 site with three custom React pages (`/generate`,
`/knowledge-base`, `/review`) and the full markdown knowledge base under
`docs/`. Talks to the Python backend at `http://localhost:3001` in local
dev.

## Setup

```bash
bun install
```

## Run

```bash
bun run start
```

Opens at http://localhost:3000. `/generate` is the main app UI,
`/knowledge-base` is the browsable KB landing.

## Layout

```
frontend/
├── docs/                the markdown knowledge base
│   ├── context/         always-included ground-truth docs (template, guardrails, checklist)
│   ├── principles/      always-included, all 9 principle files
│   ├── patterns/        topical: analytics, application, data, infra, integration
│   ├── policies/        topical: cybersecurity + operational
│   ├── standards/       topical
│   ├── positions/       topical
│   └── prompts/         the 3 system prompts (pattern, assurance, question)
├── src/
│   ├── pages/           generate.tsx, knowledge-base.tsx, review.tsx, index.tsx
│   ├── theme/           swizzled Docusaurus components (see src/README.md)
│   └── css/             brand tokens + component styles
├── other/               private reference docs (not published)
├── static/              images, favicon
├── blog/                Docusaurus template blog (unused, kept for template compat)
├── scripts/             content validation
├── sidebars.ts          the KB sidebar tree
└── docusaurus.config.ts
```

## Deployment

Same source, two builds, one env var.

- **GitHub Pages (public demo):** `AI4EA_DEMO_MODE=true` at build time.
  The `/generate` page shows a "public demo, generation disabled" banner
  and disables the composer. Everything else works normally (KB browses).
- **GCP (planned):** built without the env var, `/generate` calls the
  real backend.

The demo-mode toggle is a `customFields.demoMode` boolean in
`docusaurus.config.ts`, read by the `/generate` page via
`useDocusaurusContext()`.

## Config knobs (via env vars)

| Variable            | Purpose                                    | Example                              |
|---------------------|--------------------------------------------|--------------------------------------|
| `SITE_URL`          | domain for the built site                  | `https://EntegrisInternal.github.io` |
| `BASE_URL`          | path prefix, must match the repo/subpath   | `/ai4ea/`                            |
| `AI4EA_DEMO_MODE`   | `"true"` to enable the demo banner + gate  | `"true"`                             |

All three default to sensible dev values when unset.

## Broken-link policy

`onBrokenMarkdownLinks` is set to `warn` (not `throw`) because a handful
of KB docs point at documents that live in a different Entegris repo.
Those warnings should get cleaned up as the KB stabilises, but they
don't block dev or CI.
