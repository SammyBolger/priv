// this file is the home page of the site, the thing you see at "/".
//
// it has three pieces stacked vertically:
//   1. hero: red accent stripe + headline + lead
//   2. card grid: 3 cards (generator + knowledge base + submit for review)
//   3. how-it-works: three numbered steps explaining what the engine does
//
// all the styling lives in src/css/custom.css under the .gc-* classes.
// this file just lays out the structure and content.
//
// platform-governed custom code, AMP engineer review required for changes.

// docusaurus's Link component is a wrapper around react-router-dom. use it
// instead of plain <a> so internal navigation is client-side (no full page reload).
import Link from "@docusaurus/Link";

// every docusaurus page wraps in Layout to get the navbar + footer.
import Layout from "@theme/Layout";

// type-only import for what jsx returns. just used in the function signature.
import type { ReactNode } from "react";

// shape of one card in the grid below.
type Card = {
  meta: string;          // small uppercase tag at the top of the card (eg "Tool")
  title: string;         // big card title (eg "Generate a pattern")
  description: string;   // one or two lines of body text
  href: string;          // where the card links to when clicked
  cta?: string;          // optional call-to-action text shown at the bottom (eg "Open the generator")
  primary?: boolean;     // if true, the card uses the blue filled style (only on the generate card)
};

// the 3 cards in order. first one (the generator) is the primary action.
// the other two link to the knowledge base and the review workflow.
const cards: Card[] = [
  {
    meta: "Tool",
    title: "Reference architecture generator",
    description:
      "Describe a business scenario and receive a complete Entegris reference architecture, grounded in our knowledge base.",
    href: "/generate/",
    cta: "Open the generator",
    primary: true,
  },
  {
    meta: "Reference",
    title: "Knowledge base",
    description:
      "One place for every guardrail, patterns, positions, principles, policies, and standards that grounds each decision.",
    href: "/knowledge-base",
    cta: "Browse the knowledge base",
  },
  {
    meta: "Workflow",
    title: "Submit for review",
    description:
      "Send a generated reference architecture into the human-in-the-loop review workflow before it is published.",
    href: "/review/",
    cta: "Start a review",
  },
];

// the 3 numbered steps in the "how it works" section. simple text content
// rendered as a row of cards lower down.
const steps: Array<{ title: string; body: string }> = [
  {
    title: "Describe your scenario",
    body: "Write a business problem, proposed architecture, or architecture question in plain language.",
  },
  {
    title: "Generate the reference architecture",
    body: "AI4EA searches the knowledge base and assembles a complete reference architecture, grounded in our patterns, principles, positions, policies, and standards.",
  },
  {
    title: "Submit for human review",
    body: "Send the draft into human-in-the-loop review. An architect checks it against our guardrails before it is published and becomes ground truth.",
  },
];

// the page component itself. returns the jsx tree that gets rendered.
export default function Home(): ReactNode {
  return (
    // Layout adds the navbar at the top and footer at the bottom.
    // title and description show up in the browser tab and as page metadata.
    <Layout
      title="AI4EA, Enterprise Architecture on demand"
      description="AI4EA generates Entegris-grade reference architectures from a business scenario, grounded in our principles, positions, patterns, policies, and standards."
    >
      <main>
        {/* hero section: red top stripe is on the .gc-hero ::before pseudo-element in css */}
        <section className="gc-hero">
          <div className="gc-hero__inner">
            <span className="gc-eyebrow">AI4EA . AI for Enterprise Architecture</span>
            <h1>Generate Entegris reference architectures from business scenarios.</h1>
            <p className="gc-hero__lead">
              Describe the problem you are solving. AI4EA assembles a complete reference
              architecture, grounded in Entegris principles, positions, patterns, policies,
              and standards.
            </p>
          </div>
        </section>

        {/* card grid section */}
        <section className="gc-section">
          <div className="gc-section__inner">
            <span className="gc-eyebrow">Start here</span>
            {/* base grid is 3 columns, one per card */}
            <div className="gc-card-grid">
              {/* loop through each card and render it as a Link */}
              {cards.map((card) => (
                <Link
                  // the --primary modifier class makes the generate card blue with white text.
                  className={`gc-card${card.primary ? " gc-card--primary" : ""}`}
                  key={card.href}
                  to={card.href}
                >
                  <div>
                    <div className="gc-card__meta">{card.meta}</div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  {/* only the primary card has a cta line at the bottom. */}
                  {card.cta && <span className="gc-card__cta">{card.cta}</span>}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* how-it-works strip with three numbered steps. */}
        <section className="gc-how">
          <div className="gc-section__inner">
            <span className="gc-eyebrow">How it works</span>
            <div className="gc-how__grid">
              {/* loop with i so we can show step numbers 1, 2, 3. */}
              {steps.map((step, i) => (
                <div className="gc-how__step" key={step.title}>
                  {/* aria-hidden because the number is decorative.
                      screen readers will read the title which already says the order. */}
                  <span className="gc-how__num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="gc-how__title">{step.title}</h3>
                    <p className="gc-how__body">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
