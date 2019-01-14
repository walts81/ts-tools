declare global {
  interface Array<T> {
    lastOrDefault(expression?: (item: T) => boolean): T | null;
  }
}

Array.prototype.lastOrDefault = function<T>(expression?: (item: T) => boolean): T | null {
  return lastOrDefault(this, expression);
};

export default function lastOrDefault<T>(collection: T[], expression?: (item: T) => boolean): T | null {
  const exp = expression || (x => true);
  for (let i = collection.length - 1; i >= 0; i--) {
    const item = collection[i];
    if (exp(item) === true) {
      return item;
    }
  }
  return null;
}
