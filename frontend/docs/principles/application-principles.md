# Application Principles

## Applications Serve a Single Clear Capability

**Principle Name:** Applications Serve a Single Clear Capability

**Statement:** Applications should be aligned to a clear business capability and should avoid mixing unrelated functions in the same product.

**Rationale:** Capability alignment makes applications easier to understand, govern, and change. Multi-purpose applications create unclear ownership and resist rationalization.

**Implications:**

- Application scope should be reviewed against the target capability map before approval.
- Functional overlap between applications should be identified and reduced over time.
- Application portfolios should be rationalized to remove duplication and redundancy.

## Applications Expose Stable, Documented Interfaces

**Principle Name:** Applications Expose Stable, Documented Interfaces

**Statement:** Applications should publish clear, stable interfaces so they can be integrated and reused without tight coupling.

**Rationale:** Stable interfaces enable interoperability, lower integration risk, and allow applications to evolve independently without breaking consumers.

**Implications:**

- APIs and integration contracts should be documented using OpenAPI 3.1 and versioned.
- Interface changes should be managed deliberately with backward compatibility windows.
- Integration should rely on published interfaces rather than direct database access or internal dependencies.

## Reuse Shared Application Services First

**Principle Name:** Reuse Shared Application Services First

**Statement:** Common application functions should be reused through shared services before creating new duplicate capabilities.

**Rationale:** Reuse reduces duplication, lowers support burden, improves consistency, and preserves investment in established platforms.

**Implications:**

- Identity, logging, integration middleware, and common utilities should be shared where practical.
- New application work should evaluate existing shared capabilities before proposing net-new builds.
- Shared services should have clear ownership, documented interfaces, and active support.

## Application User Experience Should Be Simple and Consistent

**Principle Name:** Application User Experience Should Be Simple and Consistent

**Statement:** Application experiences should be easy to understand, consistent across channels, and designed to minimize user effort and training burden.

**Rationale:** Simple and consistent experiences improve adoption, reduce support needs, and lower the total cost of change when interfaces evolve.

**Implications:**

- User flows should be tested for clarity and simplicity before release.
- Common UX patterns should be reused across applications to reduce cognitive load.
- Experience design should reduce avoidable user friction and eliminate unnecessary steps.

## Application Portfolio Management and Rationalization

**Principle Name:** Application Portfolio Management and Rationalization

**Statement:** The application portfolio should be actively managed — retiring, consolidating, or replacing applications that no longer deliver clear business value, to prevent portfolio sprawl and unsustainable support burden.

**Rationale:** Entegris's architecture strategy prioritizes a clean, rationalized application portfolio. Every application in the portfolio carries a support, integration, and licensing cost. Unmanaged portfolio growth obscures accountability and compounds technical debt.

**Implications:**

- Applications should have a documented owner, business value justification, and regular health review.
- Redundant or underutilized applications should be candidates for consolidation or retirement in each planning cycle.
- New application requests should demonstrate that an existing application cannot meet the need before approval is granted.

## Build vs. Buy vs. Reuse Evaluation

**Principle Name:** Build vs. Buy vs. Reuse Evaluation

**Statement:** Every new application capability must be evaluated in the sequence: Reuse an existing capability → Buy a SaaS solution → Build custom. Custom development is the last resort, not the first.

**Rationale:** Custom builds carry the highest long-term cost and risk. Reuse and SaaS leverage existing investment, community support, and vendor-managed maintenance. The evaluation sequence ensures Entegris defaults to the lowest total-cost-of-ownership option.

**Implications:**

- Solution design must document the reuse and buy evaluation before a build option is approved.
- Preference is SaaS → PaaS → IaaS → custom, in that order.
- ARB/TRB review of custom build proposals should include explicit challenge on whether a SaaS or existing internal capability could serve the need.

## Accessibility and Inclusive Design

**Principle Name:** Accessibility and Inclusive Design

**Statement:** Applications should be designed to be accessible to all users, including those with disabilities, across all supported devices and channels.

**Rationale:** Accessible design is both a legal requirement and a mark of quality. Applications designed inclusively are more usable by all users, not just those with accessibility needs, and reduce the risk of compliance exposure in regulated markets.

**Implications:**

- Applications should meet WCAG 2.1 AA accessibility standards as a minimum baseline.
- Accessibility should be tested alongside functional testing in the delivery pipeline.
- Responsive design should be standard so applications function across screen sizes and device types.

---
