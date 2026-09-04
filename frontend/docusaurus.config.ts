// Template default. Consumers: customize site title, navigation, and footer links for your repository.
// What's tunable:
//   - SITE_URL and BASE_URL - set by CI for GitHub Pages; override both for custom domains.
//   - navbar/footer links - replace starter links with repository-specific content.
//   - onBrokenLinks and markdown.hooks.onBrokenMarkdownLinks - keep as throw for governed validation.

import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Governed Content Site",
  tagline: "Reviewed content, published through governed workflows.",
  favicon: "img/favicon.png",

  url: process.env.SITE_URL ?? "https://EntegrisInternal.github.io",
  baseUrl: process.env.BASE_URL ?? "/",
  organizationName: "Entegris-AMP",
  projectName: "governed-content",
  trailingSlash: true,

  onBrokenLinks: "throw",

  // build-time flags read by our custom pages. AI4EA_DEMO_MODE=true is set by
  // the gh pages deploy workflow so /generate shows the "public demo, generation
  // disabled" banner. the gcp build leaves it unset so the full app works.
  customFields: {
    demoMode: process.env.AI4EA_DEMO_MODE === "true",
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    format: "detect",
    mermaid: true,
    hooks: {
      // "warn" not "throw" so dev doesn't crash on the handful of stale
      // inter-doc links in the current kb content. those should get fixed
      // in the markdown, but they shouldn't block booting the site.
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // last-updated info needs git history, which a shallow ci checkout
          // doesn't have. off for now; re-enable + set fetch-depth: 0 in the
          // workflow if we want per-doc author/timestamp back.
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        // blog plugin disabled - AI4EA isn't a blog and we deleted the
        // frontend/blog/ folder to keep the tree focused on the KB + app.
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: "description",
        content: "Internal governed-content documentation site for Entegris AMP repositories.",
      },
    ],
    navbar: {
      title: "AI4EA",
      logo: {
        alt: "Entegris",
        src: "img/entegris-logo-stacked-2color.png",
        srcDark: "img/entegris-logo-stacked-2color.png",
      },
      hideOnScroll: false,
      items: [
        { to: "/generate", label: "Generator", position: "left" },
        { to: "/knowledge-base", label: "Knowledge base", position: "left" },
        { to: "/review", label: "Submit for review", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright ${new Date().getFullYear()} Entegris, Inc. Internal use only.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      // Color mode is disabled, so the dark Prism theme intentionally matches light mode.
      darkTheme: prismThemes.oneLight,
      additionalLanguages: ["bash", "yaml", "docker", "python", "json", "toml", "sql"],
    },
    mermaid: {
      theme: { light: "base", dark: "base" },
      options: {
        themeVariables: {
          primaryColor: "#F7F5F5",
          primaryBorderColor: "#7F7773",
          primaryTextColor: "#393630",
          lineColor: "#7F7773",
          secondaryColor: "#ECE9E7",
          tertiaryColor: "#FFFFFF",
          fontFamily: "Open Sans, Arial, sans-serif",
          fontSize: "14px",
        },
        flowchart: { curve: "basis", padding: 16, nodeSpacing: 30, rankSpacing: 50 },
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
