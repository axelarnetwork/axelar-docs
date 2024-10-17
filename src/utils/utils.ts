import type { Navigation } from "./generateNavigation";

export const getUrl = (nav: Navigation) => {
  if (nav?.href) {
    return nav.href;
  }

  if (nav?.children?.[0]) return getUrl(nav?.children?.[0]);
};
