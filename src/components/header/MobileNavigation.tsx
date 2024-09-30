import {
  hiddenNav,
  permanentNav,
  type Navigation,
} from "@/utils/generateNavigation";
import { getUrl } from "@/utils/utils";
import clsx from "clsx";
import { LayoutGrid, Menu, X } from "lucide-react";
import React, { useEffect } from "react";
import Logo from "../logo";
import RenderSidebar from "../sidebar/render-sidebar";
import ThemeToggle from "../ui/theme-toggle";

const MobileNavigation = ({
  nav,
  pathname,
}: {
  nav: Navigation[];
  pathname: string;
}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center"
      >
        <Menu size={24} />
      </button>
      <div
        className={clsx(
          "lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
          "fixed top-0 right-0 pb-12  overflow-y-auto flex-col flex gap-8 bottom-0 left-0 bg-background z-10 transition-transform",
        )}
      >
        <div className="flex bg-background-neutral border-border  justify-between py-4 px-4 border-b">
          <Logo className="w-28" />
          <div className="flex gap-4 items-center">
            <div className="flex gap-3  items-center">
              <a
                href="https://github.com/axelarnetwork/axelar-docs"
                aria-label="Axelar on GitHub"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
              <ThemeToggle />
            </div>
            <button onClick={() => setOpen(!open)} className="text-primary">
              <X size={24} />
            </button>{" "}
          </div>
        </div>
        <div>
          <div className="px-4 md:px-8 flex flex-col gap-1 border-b border-border mb-3 pb-8">
            {nav
              ?.filter(
                (item) =>
                  !permanentNav?.includes(item.currentSlug || item.title) &&
                  !hiddenNav?.includes(item.currentSlug || item.title),
              )
              .map((item) => {
                const url = getUrl(item);
                return (
                  <a
                    key={item.title}
                    href={`/${url}/`}
                    className="bg-gray  text-sm flex gap-2 items-center  px-2 py-1.5  rounded"
                  >
                    <LayoutGrid size={16} className="text-primary" />
                    <p>{item.title}</p>
                  </a>
                );
              })}
          </div>
          <RenderSidebar nav={nav} pathname={pathname} isMobile />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
