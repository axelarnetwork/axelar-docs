import type { Navigation } from "@/utils/generateNavigation";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import React, { useEffect } from "react";
import Logo from "../logo";
import RenderSidebar from "../sidebar/render-sidebar";

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
      <button onClick={() => setOpen(!open)}>
        <Menu size={24} />
      </button>
      <div
        className={clsx(
          "lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
          "fixed top-0 right-0 overflow-y-auto flex-col flex gap-8 bottom-0 left-0 bg-white z-10 transition-transform",
        )}
      >
        <div className="flex  justify-between py-4 px-4 border-b">
          <Logo className="w-28" />
          <button onClick={() => setOpen(!open)} className="text-primary">
            <X size={24} />
          </button>
        </div>
        <RenderSidebar nav={nav} pathname={pathname} isMobile />
      </div>
    </div>
  );
};

export default MobileNavigation;
