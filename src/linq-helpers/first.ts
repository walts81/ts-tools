import { EmptyArrayException, NoMatchException } from './_common';

declare global {
  interface Array<T> {
    first(expression?: (item: T) => boolean): T;
  }
}

Array.prototype.first = function<T>(expression?: (item: T) => boolean): T {
  return first(this, expression);
};

export default function first<T>(collection: T[], expression?: (item: T) => boolean): T {
  if (collection.length === 0) {
    throw new EmptyArrayException();
  }

  const exp = expression || (x => true);
  for (const x of collection) {
    if (exp(x) === true) {
      return x;
    }
  }

  throw new NoMatchException();
}
