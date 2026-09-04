// AI4EA override of the classic theme's DocItem Paginator.
//
// UX decision: the "Previous / Next" navigation at the bottom of doc pages is
// removed site-wide. Returning null suppresses the paginator on every doc.

import type { ReactNode } from "react";

export default function DocItemPaginator(): ReactNode {
  return null;
}
