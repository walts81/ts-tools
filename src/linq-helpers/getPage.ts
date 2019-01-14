import getPageCount from './getPageCount';

declare global {
  interface Array<T> {
    getPage(page: number, pageSize: number): T[];
  }
}

Array.prototype.getPage = function<T>(page: number, pageSize: number): T[] {
  return getPage<T>(this, page, pageSize);
};

export default function getPage<T>(collection: T[], page: number, pageSize: number): T[] {
  const pageSizeToUse = Math.min(pageSize, collection.length);
  const maxPage = getPageCount(collection.length, pageSizeToUse);
  if (page > maxPage) {
    page = maxPage;
  } else if (page <= 0) {
    page = 1;
  }
  const index = page - 1;
  return collection.slice(index * pageSizeToUse, page * pageSizeToUse);
}
