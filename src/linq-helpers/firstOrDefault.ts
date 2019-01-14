declare global {
  interface Array<T> {
    firstOrDefault(expression?: (item: T) => boolean): T;
  }
}

Array.prototype.firstOrDefault = function<T>(expression?: (item: T) => boolean): T | null {
  return firstOrDefault(this, expression);
};

export default function firstOrDefault<T>(collection: T[], expression?: (item: T) => boolean): T | null {
  const exp = expression || (x => true);
  for (const x of collection) {
    if (exp(x) === true) {
      return x;
    }
  }

  return null;
}
