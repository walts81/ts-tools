declare global {
  interface Array<T> {
    count(expression?: (item: T) => boolean): number;
  }
}

Array.prototype.count = function<T>(expression?: (item: T) => boolean): number {
  return count(this, expression);
};

export default function count<T>(collection: T[], expression?: (item: T) => boolean): number {
  const exp = expression || (x => true);
  let counter = 0;
  for (const x of collection) {
    if (exp(x) === true) {
      counter++;
    }
  }
  return counter;
}
