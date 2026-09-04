// AI4EA override of the classic theme's DocPaginator.
//
// UX decision: the "Previous / Next" navigation is removed site-wide. This
// component is rendered directly by the generated category index pages
// (DocCategoryGeneratedIndexPage) and, via DocItem/Paginator, by individual
// doc pages. Returning null suppresses prev/next everywhere.

import type { ReactNode } from "react";

export default function DocPaginator(): ReactNode {
  return null;
}
