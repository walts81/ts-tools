declare global {
  interface Array<T> {
    getPageCount(pageSize: number): number;
  }
}

Array.prototype.getPageCount = function(pageSize: number): number {
  return getPageCount(this.length, pageSize);
};

export default function getPageCount(total: number, pageSize: number): number {
  const x = total;
  const y = pageSize;
  let totalPages = Math.floor(x / y);
  if (x % y > 0) {
    totalPages++;
  }
  return totalPages || 1;
}
