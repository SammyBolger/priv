# Single Source of Truth

**Principle Name:** Single Source of Truth

**Statement:** Data collected and maintained in multiple places will be mastered to create a single authoritative source of truth before being used for enterprise reporting, analytics, or AI.

**Rationale:** Conflicting data across systems erodes trust, creates reconciliation overhead, and makes enterprise decisions unreliable. A single mastered source eliminates ambiguity.

**Implications:**

- Master Data Management (MDM via Informatica) should be the authoritative source for key enterprise entities.
- Data domains should have a designated Information Governor who owns mastering decisions.
- Downstream consumers should reference the master source, not maintain independent copies.
