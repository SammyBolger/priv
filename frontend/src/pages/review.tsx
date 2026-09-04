// this file is the "submit for review" page at "/review/".
//
// it's the entry point for the human-in-the-loop step: a generated reference
// architecture is a draft until an architect approves it. for now this page is
// a placeholder, the submission form and approval flow are not built yet, so it
// just shows the intended primary action and links back to the generator.
//
// platform-governed custom code, AMP engineer review required for changes.

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

export default function ReviewPage(): ReactNode {
  return (
    <Layout
      title="Submit for review, AI4EA"
      description="Submit a generated Entegris reference architecture for human-in-the-loop review before it is published."
    >
      <main>
        {/* hero: same red-stripe treatment as the home page so the two feel related. */}
        <section className="gc-hero">
          <div className="gc-hero__inner">
            <span className="gc-eyebrow">AI4EA . Human-in-the-loop review</span>
            <h1>Submit a reference architecture for review.</h1>
            <p className="gc-hero__lead">
              Generated reference architectures are drafts until a person approves them. Submit
              one here to start the review: an architect checks it against our guardrails before
              it is published and becomes ground truth for future generations.
            </p>
          </div>
        </section>

        {/* placeholder panel. the form and approval flow land here later. */}
        <section className="gc-section">
          <div className="gc-section__inner">
            <div className="gc-review-panel">
              <span className="gc-pill">Coming soon</span>
              <h2>Review workflow</h2>
              <p>
                This is where a generated reference architecture gets submitted for human
                review. The submission form and approval flow are being built.
              </p>
              <div className="gc-actions">
                {/* the intended primary action. disabled until the workflow exists. */}
                <button className="gc-button gc-button--primary" type="button" disabled>
                  Submit for review
                </button>
                {/* keep the page navigable: send people to the generator to create a draft. */}
                <Link className="gc-button gc-button--secondary" to="/generate/">
                  Generate one first
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
