# Automate Where Possible

**Principle Name:** Automate Where Possible

**Statement:** Technology operations, provisioning, updates, and management should be automated wherever practical using Infrastructure as Code and CI/CD pipelines.

**Rationale:** Automation improves consistency, reduces human error, and scales better than manual work. Manual processes are a source of drift, delay, and undocumented decisions.

**Implications:**

- Infrastructure as Code (Terraform) should be standard for all cloud resource provisioning.
- Deployments and routine operations should be automated through GitHub Actions pipelines.
- Manual steps should be rare, documented, and explicitly justified when they exist.
