# Security and Privacy by Design for AI

**Principle Name:** Security and Privacy by Design for AI

**Statement:** AI systems should embed security, privacy, and access controls from design through operations — with additional scrutiny beyond standard application security.

**Rationale:** AI introduces unique risks including prompt injection, data leakage through model outputs, and unintended inference from training data. These risks require explicit design attention beyond standard application security practices.

**Implications:**

- Threat modeling specific to AI attack surfaces should be part of every AI design and architecture review.
- Least-privilege access should apply to data, models, prompts, and tool-calling surfaces.
- Privacy controls should be explicitly defined for training data, inference inputs, and output logging.
