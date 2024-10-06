import {
  hideLinksFromSidebar,
  hideNav,
} from "@/content/_navigation/navigation";
import type { Navigation } from "@/utils/generateNavigation";

export function findPrevAndNextPages(nav: Navigation[], pathname: string) {
  let allItems: Navigation[] = [];

  function flattenNav(nav: Navigation[]) {
    nav.forEach((item) => {
      if (
        !hideLinksFromSidebar.includes(`/${item.href}/`) &&
        !hideNav.includes(item?.href?.split("/")[0] ?? "") &&
        !item.externalLink &&
        !hideNav.includes(item.file as string)
      ) {
        allItems.push(item);
        if (item.children && item.children.length > 0) {
          flattenNav(item.children);
        }
      }
    });
  }

  flattenNav(nav);

  const currentIndex = allItems.findIndex(
    (item) => `/${item.href}/` === `${pathname}`,
  );

  const prevIndex = currentIndex - 1;
  const nextIndex = currentIndex + 1;

  let prevPage = prevIndex >= 0 ? allItems[prevIndex] : null;
  let nextPage =
    nextIndex < allItems.length ? findFirstSubitem(allItems[nextIndex]) : null;

  if (currentIndex > 0 && hasSubItems(allItems[currentIndex - 1])) {
    prevPage = findLevelBackItem(allItems, currentIndex - 2);
  }

  return { prevPage, nextPage };
}

function hasSubItems(item: Navigation) {
  return item.children && item.children.length > 0;
}

function findFirstSubitem(item: Navigation) {
  if (hasSubItems(item) && item?.children && item?.children?.length > 0) {
    return findFirstSubitem(item?.children[0]);
  }
  return item;
}

function findLevelBackItem(allItems: Navigation[], index: number) {
  if (index >= 0) {
    const currentItem = allItems[index];
    if (hasSubItems(currentItem)) {
      return findLevelBackItem(allItems, index - 1);
    }
    return currentItem;
  }
  return null;
}
