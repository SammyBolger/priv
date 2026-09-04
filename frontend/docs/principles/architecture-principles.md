# Architecture Principles

## Cloud-Smart by Default

**Principle Name:** Cloud-Smart by Default

**Statement:** Cloud services are the default deployment choice for all new technology investments. On-premises infrastructure is reserved for cases where regulatory, security, or operational requirements cannot be met through cloud alternatives.

**Rationale:** Entegris's reference architecture positions GCP as the primary hyperscaler for data, AI, and custom applications, with AWS supporting SAP/ERP workloads and Azure for specific tooling. A cloud-smart default accelerates delivery, reduces operational burden, and aligns cost to consumption.

**Implications:**

- New solution designs must demonstrate why cloud is not viable before on-premises options are approved.
- Cloud provider selection should align to the enterprise reference architecture (GCP primary, AWS/Azure for designated workloads).
- SaaS is preferred over IaaS/PaaS where a fit-for-purpose SaaS exists.

## Internet and API First

**Principle Name:** Internet and API First

**Statement:** Solutions should be designed for internet-based connectivity and API-first integration. Reliance on the internal corporate network as a dependency is a design red flag.

**Rationale:** The Architecture Strategy explicitly identifies reliance on the internal network vs. internet-first as an operating red flag. API-first design enables interoperability, supports external collaboration, and is a prerequisite for cloud-native and SaaS architectures.

**Implications:**

- New integration designs must use published APIs, not internal network dependencies.
- Solutions requiring VPN or internal network access by design should be escalated for architectural review.
- External-facing APIs should follow enterprise API standards and versioning practices.

## SaaS Before Custom Build

**Principle Name:** SaaS Before Custom Build

**Statement:** Standard SaaS applications are preferred over custom-built solutions. Custom development is only justified when no viable SaaS option exists or when core competitive differentiation requires it.

**Rationale:** Entegris maintains a clean portfolio with no custom-built applications and an overall SaaS deployment model. This posture reduces complexity, lowers support burden, and allows IT to focus investment on differentiated business value.

**Implications:**

- Solution selection must include a documented SaaS market assessment before custom build is approved.
- Customization of SaaS applications should be avoided in favor of configuration.
- The ARB/TRB should challenge custom build proposals that could be served by SaaS.

## Single ERP, Minimal Customization

**Principle Name:** Single ERP, Minimal Customization

**Statement:** Entegris maintains a single ERP instance (SAP) and avoids application customization in favor of standard configuration and process adaptation.

**Rationale:** The architecture strategy identifies Entegris's single SAP instance as a strategic asset and a source of portfolio cleanliness. Customization creates upgrade debt, integration complexity, and support burden that compounds over time.

**Implications:**

- Business process changes should be evaluated against SAP standard capability before requesting customization.
- ERP extension decisions should be reviewed by the ARB.
- SAP RISE architecture decisions should preserve upgrade path integrity.

## Platform Over Point Solutions

**Principle Name:** Platform Over Point Solutions

**Statement:** Shared platforms (Infrastructure Cloud, Data, AI) are preferred over isolated point solutions. New capabilities should be built on or extend enterprise platforms rather than creating standalone systems.

**Rationale:** The Architecture Strategy defines a layered digital platform model — Infrastructure Cloud Platform → Data/ML Platform → AI Platform. Point solutions fragment the landscape, increase integration cost, and prevent reuse of shared capabilities like data pipelines, AI services, and integration middleware.

**Implications:**

- New initiatives should evaluate existing enterprise platforms (GCP, Boomi, Informatica, SAP) before proposing net-new infrastructure.
- Platform capabilities should be documented and discoverable so teams can reuse them.
- Exceptions require ARB approval and a documented rationale.

## Integration Through Standard Middleware

**Principle Name:** Integration Through Standard Middleware

**Statement:** Application-to-application integration should use the enterprise integration platform (Boomi) rather than direct point-to-point connections or file-based transfers.

**Rationale:** Entegris has deliberately moved from file transfer-based integration to full API/event-based integration via Boomi. Point-to-point integrations create invisible dependencies, complicate change management, and resist scaling.

**Implications:**

- New integration designs should use the approved middleware platform.
- File-based integration is a legacy pattern and should not be introduced in new solutions.
- Integration patterns (synchronous API, asynchronous event, batch) should follow documented enterprise standards.

## Lean Before Digitize

**Principle Name:** Lean Before Digitize

**Statement:** Business processes should be simplified and optimized before they are digitized. Technology should not be used to automate a broken or inefficient process.

**Rationale:** The Architecture Strategy explicitly states to adopt a lean-before-digitize approach for digital business transformation. Digitizing a flawed process embeds the flaw at scale and increases the cost to fix later.

**Implications:**

- Digital initiatives should include a process review and CI/Entegris Way alignment step before technology design begins.
- Continuous Improvement teams should be engaged in the solution design phase.
- Architecture reviews should challenge whether underlying processes have been examined before approving digitization.

## OT and IT Architecture Convergence

**Principle Name:** OT and IT Architecture Convergence

**Statement:** Operational Technology (plant floor, manufacturing equipment, labs) and Information Technology architectures should converge through the Connect & Collect reference architecture and OT Data Platform, enabling unified data flows while preserving OT security requirements.

**Rationale:** Entegris's digital manufacturing and EDIP strategy depend on data from OT systems reaching the enterprise data layer. The Architecture Strategy defines an OT Data Platform as a distinct layer within the digital platform architecture.

**Implications:**

- OT systems should be connected through the approved Connect & Collect reference architecture.
- IT/OT integration designs must address plant floor cybersecurity requirements as a non-negotiable constraint.
- OT data should flow to the enterprise data lake through governed pipelines, not ad hoc extracts.

## Architecture Governance Through ARB and TRB

**Principle Name:** Architecture Governance Through ARB and TRB

**Statement:** All significant solution architecture decisions must pass through the Architecture Review Board (ARB) and/or Technology Review Board (TRB) before commitment.

**Rationale:** The Architecture Strategy defines the ARB/TRB as the formal governance gate between capability identification, solution selection, and ongoing operations. Bypassing governance creates unmanaged technical debt and misalignment with enterprise standards.

**Implications:**

- ARB/TRB engagement should occur during solution design, not after vendor selection.
- Architecture Positions and Patterns should be the primary reference for design decisions.
- Teams should use GitHub-based documentation workflows for architecture artifacts where possible.

---
