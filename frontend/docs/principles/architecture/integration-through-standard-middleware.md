# Integration Through Standard Middleware

**Principle Name:** Integration Through Standard Middleware

**Statement:** Application-to-application integration should use the enterprise integration platform (Boomi) rather than direct point-to-point connections or file-based transfers.

**Rationale:** Entegris has deliberately moved from file transfer-based integration to full API/event-based integration via Boomi. Point-to-point integrations create invisible dependencies, complicate change management, and resist scaling.

**Implications:**

- New integration designs should use the approved middleware platform.
- File-based integration is a legacy pattern and should not be introduced in new solutions.
- Integration patterns (synchronous API, asynchronous event, batch) should follow documented enterprise standards.
