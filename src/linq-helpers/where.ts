declare global {
  interface Array<T> {
    where(expression: (item: T) => boolean): T[];
  }
}

Array.prototype.where = function<T>(expression: (item: T) => boolean): T[] {
  return where(this, expression);
};

export default function where<T>(collection: T[], expression: (item: T) => boolean): T[] {
  const results: T[] = [];
  for (const x of collection) {
    if (expression(x) === true) {
      results.push(x);
    }
  }
  return results;
}
