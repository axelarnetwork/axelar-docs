import { externalLinks } from "@/content/_navigation/external-links";
import {
  hideLinksFromSidebar,
  hideNav,
  mainNav,
  sortedNavigation,
} from "@/content/_navigation/navigation";
import clsx from "clsx";
import { ChevronDown, LayoutGrid } from "lucide-react";
import React, { useEffect } from "react";
import { permanentNav, type Navigation } from "../../utils/generateNavigation";

const RenderSidebar = ({
  nav,
  pathname,
  isMobile,
}: {
  nav: Navigation[];
  pathname: string;
  isMobile?: boolean;
}) => {
  const current = pathname.split("/")[1];
  const currentNav = nav?.filter(
    (item) => item.file === current && !permanentNav.includes(current),
  );
  const otherNav = nav?.filter((item) => !mainNav?.includes(item?.file ?? ""));
  return (
    <aside
      className={clsx(
        isMobile ? "flex lg:hidden" : "hidden lg:flex",
        " flex-col lg:bg-background-neutral px-4 md:px-6 lg:pb-9 lg:pt-4 sidebar-scroll  lg:overflow-y-auto  lg:w-[20rem] lg:h-[calc(100dvh-80px)] top-[80px] sticky",
      )}
    >
      {currentNav?.length > 0 && (
        <Nav
          nav={currentNav?.filter(
            (item) => item.file && !hideNav.includes(item?.file),
          )}
          index={0}
          pathname={pathname}
        />
      )}
      {externalLinks?.[current] && (
        <Nav nav={[externalLinks[current]]} index={0} pathname={pathname} />
      )}
      {otherNav?.length > 0 && (
        <Nav
          nav={otherNav?.filter(
            (item) => item.file && !hideNav.includes(item?.file),
          )}
          index={0}
          pathname={pathname}
        />
      )}
    </aside>
  );
};

export default RenderSidebar;

const NavDropDown = ({
  item,
  index,
  pathname,
}: {
  item: Navigation;
  index: number;
  pathname: string;
}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (pathname?.split("/")[index + 1] === item?.file) {
      setOpen(true);
    }
  }, [pathname]);
  return (
    <div className="flex  flex-col gap-1.5 ">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between gap-3 p-1.5 hover:bg-gray  rounded text-sm items-center "
      >
        <p className="flex-1 text-left">{item.title}</p>

        <ChevronDown
          size={16}
          className={clsx(
            open ? "rotate-180" : "",
            "transition-all duration-300",
          )}
        />
      </button>
      {open && (
        <Nav nav={item.children} index={index + 1} pathname={pathname} />
      )}
    </div>
  );
};
const Nav = ({
  nav,
  index,
  pathname,
}: {
  nav?: Navigation[];
  index: number;
  pathname: string;
}) => {
  return (
    <div
      style={{
        paddingLeft: `${index * 10 * 0.6}px`,
      }}
      className="flex flex-col  gap-1.5"
    >
      {nav?.map((item, i) => {
        const currentTopHeaderFolder = sortedNavigation.find(
          (i) => i.file === item.file,
        ) as Navigation;

        return item.children ? (
          index === 0 ? (
            <div key={index} className="mt-5">
              <div className="bg-gray mb-3 text-sm flex gap-2 items-center  px-2 py-1.5  rounded">
                <LayoutGrid size={16} className="text-primary" />
                <p>
                  {currentTopHeaderFolder?.subHeader ??
                    item.title ??
                    item?.header}
                </p>
              </div>
              <Nav nav={item.children} index={index + 1} pathname={pathname} />
            </div>
          ) : (
            <NavDropDown
              item={item}
              index={index}
              key={i}
              pathname={pathname}
            />
          )
        ) : (
          <a
            key={i}
            href={
              item?.externalLink ??
              (item?.href?.startsWith("https://")
                ? item.href
                : `/${item.href}/`)
            }
            target={
              item?.externalLink
                ? "_blank"
                : item?.href?.startsWith("https://")
                  ? "_blank"
                  : "_self"
            }
            className={clsx(
              item.href && hideLinksFromSidebar.includes(`/${item.href}/`)
                ? "hidden"
                : "",
              "text-sm p-1.5 hover:bg-gray rounded",
              pathname === `/${item.href}/` ? "text-primary" : "",
            )}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
};
