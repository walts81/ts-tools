declare global {
  interface Array<T> {
    any(expression: (item: T) => boolean): boolean;
  }
}

Array.prototype.any = function<T>(expression: (item: T) => boolean): boolean {
  return any(this, expression);
};

export default function any<T>(collection: T[], expression: (item: T) => boolean): boolean {
  for (const x of collection) {
    if (expression(x) === true) {
      return true;
    }
  }
  return false;
}
