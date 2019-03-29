declare global {
  interface Array<T> {
    distinct<TKey = T>(expression?: (item: T) => TKey | T): T[];
  }
}

Array.prototype.distinct = function<T, TKey = T>(expression?: (item: T) => TKey | T): T[] {
  return distinct(this, expression as any);
};

export default function distinct<T, TKey = T>(collection: T[], expression: (item: T) => TKey | T = x => x): T[] {
  const results: T[] = [];
  const keys: Array<TKey | T> = [];
  for (const x of collection) {
    const key = expression(x);
    if (keys.indexOf(key) < 0) {
      keys.push(key);
      results.push(x);
    }
  }
  return results;
}
