import { getNavigation } from "@/layouts/navigation";

export function findPrevAndNextPages(pathname: string) {
  const initialUrl = pathname?.match(/\/([^\/]*)\//)?.[1];
  const nav = getNavigation(initialUrl);

  const currentItem = findItemByHref(nav, pathname);
  if (!currentItem) return { prevPage: null, nextPage: null };

  const parentItem = findParentItem(nav, currentItem);
  if (!parentItem) return { prevPage: null, nextPage: null };

  const currentIndex = parentItem.children.findIndex(
    (item) => item.href === pathname,
  );

  let prevPage =
    currentIndex > 0 ? parentItem.children[currentIndex - 1] : null;
  let nextPage =
    currentIndex < parentItem.children.length - 1
      ? parentItem.children[currentIndex + 1]
      : null;

  if (prevPage === null && hasSubItems(currentItem)) {
    prevPage = currentItem.children[0];
  }

  if (nextPage === null && hasSubItems(currentItem)) {
    nextPage = currentItem.children[0];
  }

  if (!hasSubItems(currentItem)) {
    prevPage = findPrevSibling(parentItem, currentItem);
    nextPage = findNextSibling(parentItem, currentItem);
  }

  return { prevPage, nextPage };
}

function hasSubItems(item) {
  return item.children && item.children.length > 0;
}

function findItemByHref(nav, href) {
  for (let item of nav) {
    if (item.href === href) {
      return item;
    } else if (item.children && item.children.length > 0) {
      const childItem = findItemByHref(item.children, href);
      if (childItem) return childItem;
    }
  }
  return null;
}

function findParentItem(nav, currentItem) {
  for (let item of nav) {
    if (item.children && item.children.includes(currentItem)) {
      return item;
    } else if (item.children && item.children.length > 0) {
      const parentItem = findParentItem(item.children, currentItem);
      if (parentItem) return parentItem;
    }
  }
  return null;
}

function findPrevSibling(parentItem, currentItem) {
  const index = parentItem.children.findIndex((item) => item === currentItem);
  return index > 0 ? parentItem.children[index - 1] : null;
}

function findNextSibling(parentItem, currentItem) {
  const index = parentItem.children.findIndex((item) => item === currentItem);
  return index < parentItem.children.length - 1
    ? parentItem.children[index + 1]
    : null;
}
