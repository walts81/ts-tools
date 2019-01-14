import { EmptyArrayException, NoMatchException } from './_common';

declare global {
  interface Array<T> {
    last(expression?: (item: T) => boolean): T;
  }
}

Array.prototype.last = function<T>(expression?: (item: T) => boolean): T {
  return last(this, expression);
};

export default function last<T>(collection: T[], expression?: (item: T) => boolean): T {
  if (collection.length === 0) {
    throw new EmptyArrayException();
  }

  const exp = expression || (x => true);
  for (let i = collection.length - 1; i >= 0; i--) {
    const item = collection[i];
    if (exp(item) === true) {
      return item;
    }
  }

  throw new NoMatchException();
}
