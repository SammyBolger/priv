# Data Principles

## Data as a Strategic Asset

**Principle Name:** Data as a Strategic Asset

**Statement:** Data is a strategic enterprise asset and should be managed, governed, and invested in with the same rigor as financial or physical assets.

**Rationale:** Entegris's digital transformation, AI strategy, and competitive differentiation all depend on high-quality, accessible, and trusted data. Treating data as a byproduct rather than an asset leads to poor quality, low trust, and missed business value.

**Implications:**

- Data ownership, stewardship, and quality accountability should be formally assigned.
- Data investments should be evaluated against business value and strategic impact.
- Data assets should be discoverable, documented, and accessible to authorized consumers.

## Data Quality at the Source

**Principle Name:** Data Quality at the Source

**Statement:** Data quality issues should be corrected at the earliest possible point in the data lifecycle and in the originating source system — not patched downstream.

**Rationale:** Fixing data quality downstream is more expensive, less reliable, and perpetuates the underlying problem. Correct data at the source eliminates errors for all downstream consumers simultaneously.

**Implications:**

- Data quality standards should be defined and enforced at ingestion, not transformation.
- Source system owners are accountable for the quality of data they produce.
- Data quality incidents should be tracked with impact, owner, resolution plan, and timeline.

## Single Source of Truth

**Principle Name:** Single Source of Truth

**Statement:** Data collected and maintained in multiple places will be mastered to create a single authoritative source of truth before being used for enterprise reporting, analytics, or AI.

**Rationale:** Conflicting data across systems erodes trust, creates reconciliation overhead, and makes enterprise decisions unreliable. A single mastered source eliminates ambiguity.

**Implications:**

- Master Data Management (MDM via Informatica) should be the authoritative source for key enterprise entities.
- Data domains should have a designated Information Governor who owns mastering decisions.
- Downstream consumers should reference the master source, not maintain independent copies.

## Data Domains and Accountability

**Principle Name:** Data Domains and Accountability

**Statement:** All data assets are aligned to clearly defined data domains with assigned decision rights, Information Governors, and stewardship accountability.

**Rationale:** Without clear ownership, data quality, access, and governance decisions default to ambiguity. Domain alignment ensures accountability scales across a complex enterprise landscape.

**Implications:**

- Each data element belongs to exactly one data domain with a single Information Governor.
- The Data Governance Council appoints Information Governors and resolves cross-domain conflicts.
- The Data Governance Stewardship Community collaborates with Governors to apply governance locally.

## Governed Metadata Management

**Principle Name:** Governed Metadata Management

**Statement:** Changes to published metadata will be managed through enterprise change control processes, treated with the same discipline as software or infrastructure changes.

**Rationale:** Metadata is the context that makes data trustworthy and discoverable. Uncontrolled metadata changes break integrations, reduce data trust, and make analytics unreliable.

**Implications:**

- Published metadata must reflect current state and be versioned.
- Metadata usage should be measured to assess value and identify orphaned assets.
- National and industry standards should be adopted for metadata where available.

## Data Policy Rooted in Business Need

**Principle Name:** Data Policy Rooted in Business Need

**Statement:** All data policies must be rooted in actual business need, balancing data liberation for innovation with access restriction required by regulation and risk.

**Rationale:** Overly restrictive data policy prevents value creation; insufficiently restrictive policy creates compliance and reputational risk. Policy must reflect the real risk and value context of each data asset.

**Implications:**

- Data should be liberated to support innovation and analytics wherever regulation permits.
- Access restrictions should be explicitly tied to a regulatory, contractual, or security requirement.
- Data policies should be transparent, accessible, and consistently enforced.

---
