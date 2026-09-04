// AI4EA override of the classic theme's DocItem Footer.
//
// Two UX decisions are applied here site-wide:
//   1. The tags row is removed - no tag chips are shown on doc pages.
//   2. Instead of git-derived "last updated" metadata (which was showing stale,
//      template values), every doc shows a single fixed line:
//      "Last updated on Jul 6, 2026 by Sam Bolger".
//
// The date is expressed in UTC so it renders as July 6 regardless of the
// visitor's timezone. LastUpdated formats the value with `new Date(...)`, so it
// is passed in milliseconds.

import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import EditMetaRow from "@theme/EditMetaRow";
import type { ReactNode } from "react";

// July 6, 2026 (UTC), in milliseconds.
const LAST_UPDATED_AT = Date.UTC(2026, 6, 6);
const LAST_UPDATED_BY = "Sam Bolger";

export default function DocItemFooter(): ReactNode {
  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}>
      <EditMetaRow
        className={clsx(
          "margin-top--sm",
          ThemeClassNames.docs.docFooterEditMetaRow,
        )}
        editUrl={undefined}
        lastUpdatedAt={LAST_UPDATED_AT}
        lastUpdatedBy={LAST_UPDATED_BY}
      />
    </footer>
  );
}
