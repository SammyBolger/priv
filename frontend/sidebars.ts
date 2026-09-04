// Sidebar for the docs plugin. One top-level "Knowledge base" section, no
// "Start here" chrome. Each of the 5 areas (Policies, Patterns, Principles,
// Standards, Positions) lists its docs FLAT - no sub-categories - so clicking
// into an area shows every item in one table via the
// src/theme/DocCategoryGeneratedIndexPage swizzle.

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "category",
      label: "Knowledge base",
      collapsed: false,
      link: {
        type: "generated-index",
        slug: "/knowledge-base",
        title: "Knowledge base",
        description:
          "Browse Entegris policies, patterns, principles, standards, and positions.",
      },
      items: [
        {
          type: "category",
          label: "Policies",
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/knowledge-base/policies",
            title: "Policies",
            description:
              "Mandatory rules that govern how Entegris builds, runs, and secures technology.",
          },
          items: [
            "policies/cybersecurity/ai-policy",
            "policies/cybersecurity/cybersecurity-policy",
            "policies/cybersecurity/cybersecurity-risk-management-policy",
            "policies/cybersecurity/endpoint-device-protection-policy",
            "policies/cybersecurity/exceptions-management-policy",
            "policies/cybersecurity/identity-access-management-policy",
            "policies/cybersecurity/international-travel-guidelines",
            "policies/cybersecurity/it-incident-response-policy",
            "policies/cybersecurity/supplier-risk-management-policy",
            "policies/cybersecurity/technology-acceptable-use-policy",
            "policies/cybersecurity/vulnerability-management-policy",
            "policies/operational/asset-management-policy",
            "policies/operational/email-technology-configuration-policy",
            "policies/operational/incident-major-incident-response-policy",
            "policies/operational/it-backup-policy",
            "policies/operational/it-change-management-policy",
            "policies/operational/remote-access-standard",
            "policies/operational/wireless-communication-policy",
          ],
        },
        {
          type: "category",
          label: "Patterns",
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/knowledge-base/patterns",
            title: "Patterns",
            description:
              "Proven, reusable reference designs for common architecture problems across domains.",
          },
          items: [
            "patterns/analytics/event-driven-timeseries-pattern",
            "patterns/analytics/gcp-egress-pattern",
            "patterns/application/access-authorization-pattern",
            "patterns/application/ai-patterns",
            "patterns/application/cicd-pipeline-pattern",
            "patterns/application/local-ai-pattern",
            "patterns/application/web-app-deployment-pattern",
            "patterns/data/data-engineering-ingestion-pattern",
            "patterns/data/data-ingestion-pattern",
            "patterns/data/mdm-data-quality-pattern",
            "patterns/infrastructure/cloud-armor-pattern",
            "patterns/infrastructure/ot-streaming-pattern",
            "patterns/infrastructure/terraform-infrastructure-pattern",
            "patterns/integration/api-ingress-pattern",
            "patterns/integration/Application Integration Solution Patterns",
            "patterns/integration/external-file-share-pattern",
            "patterns/integration/sap-integration-pattern",
            "patterns/integration/sharepoint-ingestion-pattern",
          ],
        },
        {
          type: "category",
          label: "Principles",
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/knowledge-base/principles",
            title: "Principles",
            description:
              "The enduring beliefs and priorities that shape every architecture decision.",
          },
          items: [
            "principles/enterprise-architecture-principles",
            "principles/architecture-principles",
            "principles/ai-principles",
            "principles/application-principles",
            "principles/customer-experience-principles",
            "principles/data-principles",
            "principles/digital-transformation-principles",
            "principles/security-principles",
            "principles/technology-principles",
          ],
        },
        {
          type: "category",
          label: "Standards",
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/knowledge-base/standards",
            title: "Standards",
            description:
              "Specific, measurable requirements that implementations must meet to be compliant.",
          },
          items: [
            "standards/application-systems/data-classification-standard",
            "standards/application-systems/enterprise-systems-password-standard",
            "standards/application-systems/wireless-security-standard",
            "standards/cybersecurity/third-party-cyber-risk-management-standard",
            "standards/missing/ai-risk-management-policy",
            "standards/missing/critical-systems-standard",
            "standards/missing/entegris-encryption-standard",
            "standards/missing/network-security-management-policy",
            "standards/missing/ot-governance-policy",
            "standards/missing/removable-media-protection-standard",
            "standards/missing/secure-software-development-standard",
          ],
        },
        {
          type: "category",
          label: "Positions",
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/knowledge-base/positions",
            title: "Positions",
            description:
              "Recorded architecture positions on specific technologies, vendors, and approaches.",
          },
          items: [
            "positions/positions-overview",
            "positions/coding-agents-and-gcp-access-position",
          ],
        },
      ],
    },
  ],
};

export default sidebars;
