import type { CollectionEntry } from "astro:content";

export interface Navigation {
  title: string;
  href?: string;
  doc?: CollectionEntry<"docs">;
  children?: Navigation[];
}

function slugToTitle(slug: string): string {
  return slug

    .replace(/[-_]/g, " ")

    .replace(/\b\w/g, (char) => char.toUpperCase());
}
const generateNav = (docs: CollectionEntry<"docs">[], level: number) => {
  const topLevel = new Set();

  docs.forEach((doc) => {
    topLevel.add(doc.slug.split("/")[level]);
  });

  return [...topLevel].map((slug) => {
    const doc = docs?.find((doc) => doc.slug.split("/")[level] === slug);
    const isLastLevel = doc?.slug.split("/").length === level + 1;
    const slugStr = slug as string;
    if (!isLastLevel) {
      return {
        title: slugToTitle(slugStr),
        children:
          slug &&
          generateNav(
            docs?.filter((doc) => doc.slug.split("/")[level] === slug),
            level + 1,
          ),
      };
    } else {
      return {
        title: slugToTitle(doc?.data?.title || doc?.slug?.split("/")[level]),
        href: doc?.slug,
        doc: doc,
      };
    }
  });
};

export const generateNavigation: {
  (docs: CollectionEntry<"docs">[]): Navigation[];
} = (docs: CollectionEntry<"docs">[]) => {
  return generateNav(docs, 0);
};
