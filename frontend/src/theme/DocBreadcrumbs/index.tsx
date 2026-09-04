// AI4EA override of the classic theme's DocBreadcrumbs.
//
// UX decision: breadcrumbs (Home -> Knowledge base -> ...) are removed from
// every doc page site-wide. Returning null suppresses the breadcrumb nav
// wherever the theme would normally render it.

import type { ReactNode } from "react";

export default function DocBreadcrumbs(): ReactNode {
  return null;
}
