// knowledge base landing page, served at "/knowledge-base".
//
// mirrors the structure and styling of the site home page (src/pages/index.tsx):
//   1. hero: red accent stripe + headline + lead
//   2. card grid: one card per knowledge-base area
//
// all styling lives in src/css/custom.css under the .gc-* classes.
//
// platform-governed custom code, AMP engineer review required for changes.

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

// shape of one knowledge-base area card.
type Area = {
  meta: string;        // small uppercase tag at the top of the card
  title: string;       // big card title
  description: string; // one or two lines of body text
  href: string;        // where the card links to (a category index page)
  cta: string;         // call-to-action text shown at the bottom
};

// the 5 knowledge-base areas, each linking to its category index page.
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
      description="Browse Entegris policies, patterns, principles, standards, and positions that ground every reference architecture."
    >
      <main>
        {/* hero section: red top stripe is on the .gc-hero ::before pseudo-element in css */}
        <section className="gc-hero">
          <div className="gc-hero__inner">
            <span className="gc-eyebrow">Knowledge base</span>
            <h1>Every guardrail that grounds an Entegris reference architecture.</h1>
            <p className="gc-hero__lead">
              One place for the policies, patterns, principles, standards, and positions
              that AI4EA draws on. Choose an area to start browsing.
            </p>
          </div>
        </section>

        {/* card grid section: one card per knowledge-base area */}
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
