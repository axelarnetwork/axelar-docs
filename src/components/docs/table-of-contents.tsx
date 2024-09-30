import type { TocItem } from "@/lib/generateToc";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  toc: TocItem[];
  labels: {
    onThisPage: string;
  };
}

const TableOfContents = ({ toc = [], labels }: Props) => {
  const [currentHeading, setCurrentHeading] = useState({
    slug: toc[0].slug,
    text: toc[0].text,
  });

  useEffect(() => {}, [currentHeading]);

  const onThisPageID = "on-this-page-heading";

  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          if (id === onThisPageID) continue;

          setCurrentHeading({
            slug: entry.target.id,
            text: entry.target.textContent || "",
          });
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      rootMargin: "-100px 0% -66%",
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions,
    );

    document
      .querySelectorAll("article :is(h1,h2, h3)")
      .forEach((h) => headingsObserver.observe(h));

    return () => headingsObserver.disconnect();
  }, []);

  const onLinkClick = (e: any) => {
    setCurrentHeading({
      slug: e.currentTarget.getAttribute("href")!.replace("#", ""),
      text: e.currentTarget.textContent || "",
    });
  };

  const TableOfContentsItem = ({ heading }: { heading: TocItem }) => {
    const { depth, slug, text, children } = heading;

    return (
      <li>
        <a
          className={clsx(
            "flex items-center text-sm leading-[24px]  relative  ",
            `depth-${depth}`,
            {
              "font-medium": depth === 2,
              "font-normal": depth !== 2,
              "text-primary  hover:text-primary/50":
                currentHeading.slug === slug,
              "text-[#808080] dark:hover:text-primary dark:text-gray-400 hover:text-primary":
                currentHeading.slug !== slug,
            },
          )}
          href={`#${slug}`}
          onClick={onLinkClick}
        >
          {text}
        </a>
        {children && children?.length > 0 ? (
          <ul className="ml-7 mt-3  space-y-3 text-sm ">
            {children.map((heading) => (
              <TableOfContentsItem key={heading.slug} heading={heading} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  };

  return (
    <>
      <ul className="space-y-3 ">
        {toc.map((heading2) => (
          <TableOfContentsItem key={heading2.slug} heading={heading2} />
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
