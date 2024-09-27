import { sortedNavigation } from "@/layouts/navigation/navigation";
import type { CollectionEntry } from "astro:content";

export const permanentNav = ["learn", "resources"];
export const hiddenNav = ["controller"];
export interface Navigation {
  title: string;
  href?: string;
  currentSlug?: string;
  file?: string;
  doc?: CollectionEntry<"docs">;
  children?: Navigation[];
  header?: string;
}

function slugToTitle(slug: string): string {
  return slug

    ?.replace(/[-_]/g, " ")

    ?.replace(/\b\w/g, (char) => char.toUpperCase());
}
const generateNav = (docs: CollectionEntry<"docs">[], level: number) => {
  const topLevel = new Set();

  docs.forEach((doc) => {
    topLevel.add(
      doc?.id?.includes("index.")
        ? doc.id.split("/")[level]
        : doc.slug.split("/")[level],
    );
  });

  return [...topLevel].map((slug) => {
    const doc = docs?.find(
      (doc) =>
        doc.slug.split("/")[level] === slug ||
        doc.id.split("/")[level] === slug,
    );

    const isLastLevel =
      doc?.slug.split("/").length === level + 1 ||
      doc?.id.split("/").length === level + 1;
    const currentSlug = doc?.slug
      ?.split("/")
      ?.slice(0, level + 1)
      ?.join("/");
    const slugStr = slug as string;

    if (!isLastLevel) {
      return {
        title: slugToTitle(slugStr),
        currentSlug: currentSlug,
        file: slug,
        children:
          slug &&
          generateNav(
            docs?.filter((doc) => doc.slug.split("/")[level] === slug),
            level + 1,
          ),
      };
    } else {
      return {
        title: slugToTitle(
          doc?.data?.title ||
            doc?.slug?.split("/")[level] ||
            doc?.id?.split("/")[level - 1],
        ),
        href: doc?.slug,
        doc: doc,
        file: doc?.slug?.split("/")[level],
      };
    }
  });
};

const generateSortedNav = (
  nav: Navigation[],
  preSorted: Navigation[],
): Navigation[] => {
  const preSortedMap = new Map(
    preSorted.map((item, index) => [item.file, index]),
  );

  return nav
    .map((item) => {
      const currentPreSorted = preSortedMap.has(item.file)
        ? preSorted[preSortedMap.get(item.file)!]
        : undefined;

      const sortedChildren = item.children
        ? generateSortedNav(item.children, currentPreSorted?.children || [])
        : null;

      if (sortedChildren) {
        return {
          ...item,
          title:
            currentPreSorted?.header || currentPreSorted?.title || item.title,
          children: sortedChildren,
        };
      } else {
        return {
          ...item,
          title:
            currentPreSorted?.header || currentPreSorted?.title || item.title,
        };
      }
    })
    .sort((a, b) => {
      const aIndex = preSortedMap.has(a.file)
        ? preSortedMap.get(a.file)!
        : Infinity;
      const bIndex = preSortedMap.has(b.file)
        ? preSortedMap.get(b.file)!
        : Infinity;
      return aIndex - bIndex;
    });
};

export const generateNavigation: {
  (docs: CollectionEntry<"docs">[]): Navigation[];
} = (docs: CollectionEntry<"docs">[]) => {
  console.log(
    "docs",
    generateSortedNav(generateNav(docs, 0), sortedNavigation as any)[4],
  );

  return generateSortedNav(generateNav(docs, 0), sortedNavigation as any);
};
