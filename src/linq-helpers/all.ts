declare global {
  interface Array<T> {
    all(expression: (item: T) => boolean): boolean;
  }
}

Array.prototype.all = function<T>(expression: (item: T) => boolean): boolean {
  return all(this, expression);
};

export default function all<T>(collection: T[], expression: (item: T) => boolean): boolean {
  for (const x of collection) {
    if (expression(x) === false) {
      return false;
    }
  }
  return true;
}
