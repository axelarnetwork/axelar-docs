import clsx from "clsx";
import { ChevronDown, LayoutGrid } from "lucide-react";
import React, { useEffect } from "react";
import { permanentNav, type Navigation } from "../../utils/generateNavigation";
const mainNav = ["dev", "validator", "node"];
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
        " flex-col lg:bg-background-neutral px-4 md:px-8 lg:pb-9 lg:pt-4 sidebar-scroll  lg:overflow-y-auto  lg:w-[19.5rem] lg:h-[calc(100dvh-80px)] top-[80px] sticky",
      )}
    >
      {currentNav?.length > 0 && (
        <Nav nav={currentNav} index={0} pathname={pathname} />
      )}
      {otherNav?.length > 0 && (
        <Nav nav={otherNav} index={0} pathname={pathname} />
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
    <div className="flex  flex-col  ">
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
        paddingLeft: `${index * 10}px`,
      }}
      className="flex flex-col  gap-1.5"
    >
      {nav?.map((item, i) => {
        return item.children ? (
          index === 0 ? (
            <div key={index} className="mt-5">
              <div className="bg-gray mb-3 text-sm flex gap-2 items-center  px-2 py-1.5  rounded">
                <LayoutGrid size={16} className="text-primary" />
                <p>{item.title}</p>
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
            href={`/${item.href}/`}
            className="text-sm p-1.5 hover:bg-gray rounded"
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
};
