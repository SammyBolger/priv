# Internet and API First

**Principle Name:** Internet and API First

**Statement:** Solutions should be designed for internet-based connectivity and API-first integration. Reliance on the internal corporate network as a dependency is a design red flag.

**Rationale:** The Architecture Strategy explicitly identifies reliance on the internal network vs. internet-first as an operating red flag. API-first design enables interoperability, supports external collaboration, and is a prerequisite for cloud-native and SaaS architectures.

**Implications:**

- New integration designs must use published APIs, not internal network dependencies.
- Solutions requiring VPN or internal network access by design should be escalated for architectural review.
- External-facing APIs should follow enterprise API standards and versioning practices.
