// AI4EA override of the classic theme's generated category index page.
//
// Default behaviour renders the category's children as a grid of cards. Per UX
// feedback we instead list every item (policies, patterns, principles,
// standards, positions) in a single alternating grey/white table - the same
// look as the field/detail tables at the top of each doc - with each row
// linking straight into the item.
//
// Breadcrumbs, version banners, and the prev/next paginator are intentionally
// omitted here to match the site-wide "clean doc chrome" decision.

import { PageMetadata } from "@docusaurus/theme-common";
import {
  useCurrentSidebarCategory,
  useDocById,
  findFirstSidebarItemLink,
} from "@docusaurus/plugin-content-docs/client";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import type { Props } from "@theme/DocCategoryGeneratedIndexPage";
import type { ReactNode } from "react";

type SidebarItem = ReturnType<typeof useCurrentSidebarCategory>["items"][number];
type LinkItem = Extract<SidebarItem, { type: "link" }>;
type CategoryItem = Extract<SidebarItem, { type: "category" }>;

function IndexRow({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}): ReactNode {
  return (
    <tr>
      <td>
        <Link to={href}>{label}</Link>
      </td>
      <td>{description ?? ""}</td>
    </tr>
  );
}

function LinkRow({ item }: { item: LinkItem }): ReactNode {
  // description falls back to the target doc's frontmatter description.
  const doc = useDocById(item.docId ?? undefined);
  return (
    <IndexRow
      href={item.href}
      label={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

function CategoryRow({ item }: { item: CategoryItem }): ReactNode {
  const href = findFirstSidebarItemLink(item);
  if (!href) {
    return null;
  }
  return (
    <IndexRow href={href} label={item.label} description={item.description} />
  );
}

export default function DocCategoryGeneratedIndexPage({
  categoryGeneratedIndex,
}: Props): ReactNode {
  const category = useCurrentSidebarCategory();
  return (
    <>
      <PageMetadata
        title={categoryGeneratedIndex.title}
        description={categoryGeneratedIndex.description}
        keywords={categoryGeneratedIndex.keywords}
      />
      <div>
        <header>
          <Heading as="h1">{categoryGeneratedIndex.title}</Heading>
          {categoryGeneratedIndex.description && (
            <p>{categoryGeneratedIndex.description}</p>
          )}
        </header>
        <article className="margin-top--lg">
          <table className="gc-index-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {category.items.map((item, index) => {
                switch (item.type) {
                  case "link":
                    return <LinkRow key={index} item={item} />;
                  case "category":
                    return <CategoryRow key={index} item={item} />;
                  default:
                    return null;
                }
              })}
            </tbody>
          </table>
        </article>
      </div>
    </>
  );
}
