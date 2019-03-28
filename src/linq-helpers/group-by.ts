declare global {
  interface GroupedItems<T, TKey> {
    key: TKey;
    items: T[];
  }

  interface Array<T> {
    groupBy<TKey>(expression: (item: T) => TKey): GroupedItems<T, TKey>[];
  }
}

Array.prototype.groupBy = function<T, TKey>(expression: (item: T) => TKey): GroupedItems<T, TKey>[] {
  return groupBy(this, expression);
};

export default function groupBy<T, TKey>(collection: T[], expression: (item: T) => TKey): GroupedItems<T, TKey>[] {
  const groups: any = {};
  const results: GroupedItems<T, TKey>[] = [];
  for (const x of collection) {
    const key = expression(x);
    if (!groups[key]) {
      const group: GroupedItems<T, TKey> = { key, items: [] };
      groups[key] = group;
      results.push(group);
    }
    groups[key].items.push(x);
  }
  return results;
}
