// Knowledge base landing page, served at /knowledge-base/.
//
// Custom page (not a docs-plugin generated-index) - it owns the URL that
// the navbar "Knowledge base" link points at. Renders the 5 KB area cards
// plus an embedded search bar so users can search the KB directly from
// this landing page instead of only in the docs sidebar.
//
// Sub-category pages (/docs/knowledge-base/patterns, /docs/knowledge-base/
// policies, ...) are docs-plugin generated-index pages rendered by the
// swizzle at src/theme/DocCategoryGeneratedIndexPage.

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import SearchBar from "@theme/SearchBar";
import type { ReactNode } from "react";

type Area = {
  meta: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

const areas: Area[] = [
  {
    meta: "Guardrails",
    title: "Policies",
    description:
      "Mandatory rules that govern how Entegris builds, runs, and secures technology.",
    href: "/docs/knowledge-base/policies",
    cta: "Browse policies",
  },
  {
    meta: "Reusable designs",
    title: "Patterns",
    description:
      "Proven, reusable reference designs for common architecture problems across domains.",
    href: "/docs/knowledge-base/patterns",
    cta: "Browse patterns",
  },
  {
    meta: "Direction",
    title: "Principles",
    description:
      "The enduring beliefs and priorities that shape every architecture decision.",
    href: "/docs/knowledge-base/principles",
    cta: "Browse principles",
  },
  {
    meta: "Requirements",
    title: "Standards",
    description:
      "Specific, measurable requirements that implementations must meet to be compliant.",
    href: "/docs/knowledge-base/standards",
    cta: "Browse standards",
  },
  {
    meta: "Decisions",
    title: "Positions",
    description:
      "Recorded architecture positions on specific technologies, vendors, and approaches.",
    href: "/docs/knowledge-base/positions",
    cta: "Browse positions",
  },
];

export default function KnowledgeBase(): ReactNode {
  return (
    <Layout
      title="Knowledge base"
      description="Browse and search Entegris policies, patterns, principles, standards, and positions."
    >
      <main>
        <section className="gc-hero">
          <div className="gc-hero__inner">
            <span className="gc-eyebrow">Knowledge base</span>
            <h1>Every guardrail that grounds an Entegris reference architecture.</h1>
            <p className="gc-hero__lead">
              One place for the policies, patterns, principles, standards, and
              positions that AI4EA draws on. Search the whole KB or pick an
              area below.
            </p>

            {/* Embedded search bar. Lives in the page (not the navbar) so it
                only shows in the KB, and sits in the calm hero area rather
                than fighting for space in the top nav. */}
            <div className="kb-search">
              <SearchBar />
            </div>
          </div>
        </section>

        <section className="gc-section">
          <div className="gc-section__inner">
            <span className="gc-eyebrow">Browse by area</span>
            <div className="gc-card-grid gc-card-grid--kb">
              {areas.map((area) => (
                <Link className="gc-card" key={area.href} to={area.href}>
                  <div>
                    <div className="gc-card__meta">{area.meta}</div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                  </div>
                  <span className="gc-card__cta">{area.cta}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
