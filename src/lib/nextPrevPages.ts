import { getNavigation } from "@/layouts/navigation";

export function findPrevAndNextPages(pathname: string) {
  const initialUrl = pathname?.match(/\/([^\/]*)\//)?.[1];
  const nav = getNavigation(initialUrl);
  let allItems: any = [];

  function flattenNav(nav) {
    nav.forEach((item) => {
      allItems.push(item);
      if (item.children && item.children.length > 0) {
        flattenNav(item.children);
      }
    });
  }

  flattenNav(nav);

  const currentIndex = allItems.findIndex((item) => item.href === pathname);

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

function hasSubItems(item) {
  return item.children && item.children.length > 0;
}

function findFirstSubitem(item) {
  if (hasSubItems(item) && item?.children && item?.children?.length > 0) {
    return findFirstSubitem(item?.children[0]);
  }
  return item;
}

function findLevelBackItem(allItems, index: number) {
  if (index >= 0) {
    const currentItem = allItems[index];
    if (hasSubItems(currentItem)) {
      return findLevelBackItem(allItems, index - 1);
    }
    return currentItem;
  }
  return null;
}
