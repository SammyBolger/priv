# Applications Expose Stable, Documented Interfaces

**Principle Name:** Applications Expose Stable, Documented Interfaces

**Statement:** Applications should publish clear, stable interfaces so they can be integrated and reused without tight coupling.

**Rationale:** Stable interfaces enable interoperability, lower integration risk, and allow applications to evolve independently without breaking consumers.

**Implications:**

- APIs and integration contracts should be documented using OpenAPI 3.1 and versioned.
- Interface changes should be managed deliberately with backward compatibility windows.
- Integration should rely on published interfaces rather than direct database access or internal dependencies.
