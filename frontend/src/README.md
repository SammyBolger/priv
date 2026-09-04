# src

All the code we own on the frontend lives here. Docusaurus generates the
KB pages from `../docs/`, but everything under `src/` is custom.

## pages/

React components served at their filename route.

- `index.tsx`         AI4EA landing page (hero + cards + how-it-works)
- `generate.tsx`      the main app: chat UI, mode selector, markdown
                      renderer, retrieval + checks banners, demo-mode
                      banner. This is the biggest file in the repo
                      because it holds the whole generation UX.
- `knowledge-base.tsx` KB landing with 5 area cards
- `review.tsx`        placeholder for the human-in-the-loop review flow

## theme/

Docusaurus theme swizzles. These override default Docusaurus components
with our custom versions. Look under each subfolder for what got replaced
and why.

- `DocCategoryGeneratedIndexPage/` — the category landing pages (e.g.
  clicking "Patterns" in the sidebar). Default is a grid of tiles with
  folder icons. Ours is a single alternating gray/white table that lists
  every doc flat, matching the field/detail tables at the top of each doc.
- `DocBreadcrumbs/`, `DocItem/Footer/`, `DocItem/Paginator/`, `DocPaginator/`
  minor doc-chrome cleanups for a less busy layout.

## css/

`custom.css` holds all the styling. Uses the `--entegris-*` CSS variables
for brand colors. The `.gc-*` class names are the shared visual system
(cards, hero, buttons, tables). The `.kb-*` classes are KB-specific.
