# Avoid AI Where Rules Suffice

**Principle Name:** Avoid AI Where Rules Suffice

**Statement:** Do not use AI/ML for decisions that can be expressed as clear business rules. Use AI only where the problem space is genuinely ambiguous or requires learning from historical patterns.

**Rationale:** Rule-based systems are interpretable, maintainable, and deterministic. AI adds complexity and opacity. Complexity should only be added where it solves a problem that rules cannot.

**Implications:**

- Decision trees and rule engines should be the default for policy enforcement.
- ML should be reserved for pattern discovery, forecasting, and optimization where rules are insufficient.
- Model complexity should be justified by business value gained.
- Simpler solutions should be preferred over more complex ones.
