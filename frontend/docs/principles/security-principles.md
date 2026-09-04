# Security Principles

## Security and Privacy by Design

**Principle Name:** Security and Privacy by Design

**Statement:** Security and privacy should be addressed early and throughout the solution lifecycle so they are built in from the start rather than added as an afterthought.

**Rationale:** Security added after design is more expensive, less effective, and creates technical debt. Early integration of security reduces risk and avoids costly rework at the point of deployment.

**Implications:**

- Security requirements should be defined and reviewed during the design phase, not at release.
- Security testing should be integrated into the delivery pipeline (DevSecOps / shift-left).
- Controls should be designed into applications, infrastructure, and data from the start.

## Trust Through Transparency

**Principle Name:** Trust Through Transparency

**Statement:** Transparency around security policies, data handling, and access activity is essential to build and maintain trust with customers, employees, and regulators.

**Rationale:** Transparency supports accountability, enables audit, and builds confidence in Entegris's systems and data stewardship practices.

**Implications:**

- Security policies should be clear, accessible, and communicated proactively.
- All access and activity should be visible, logged, and auditable.
- Communication around security events should be honest, timely, and appropriately scoped.

## Trust Through Data Stewardship

**Principle Name:** Trust Through Data Stewardship

**Statement:** Data stewardship must protect confidentiality, integrity, and availability according to the sensitivity and context of the data throughout its full lifecycle.

**Rationale:** Responsible data stewardship is required for customer trust, regulatory compliance, and the integrity of business decisions that depend on accurate data.

**Implications:**

- All data should be classified and handled according to its sensitivity tier.
- Data access and use should be monitored and logged for accountability.
- Encryption and access controls should be applied based on data risk classification, not uniformly minimized.

## Security Assurance Through Least Privilege

**Principle Name:** Security Assurance Through Least Privilege

**Statement:** People and systems should only have access to the information and resources necessary for their legitimate purpose — no more.

**Rationale:** Least privilege lowers the blast radius and probability of misuse, compromise, and accidental data exposure across all layers of the architecture.

**Implications:**

- Access should be granted based on confirmed need, not role convenience.
- Privileged access should be controlled, time-limited, and reviewed regularly.
- Access should be revoked promptly when a role, project, or employment relationship changes.

## Defense in Depth

**Principle Name:** Defense in Depth

**Statement:** Security controls should be layered across multiple levels of the architecture so that if one control fails, others remain effective.

**Rationale:** No single security control is sufficient on its own. Layered controls reduce the likelihood and impact of a successful breach across network, identity, application, and data layers.

**Implications:**

- Security controls should exist at the network, identity, application, and data layers.
- Monitoring and detection capabilities should be independent of preventive controls.
- Architecture reviews should evaluate whether security relies on any single point of protection.

---
