import { Comparer, DefaultComparer, EmptyArrayException } from './_common';

declare global {
  interface Array<T> {
    min<TProp>(selector?: (item: T) => TProp, comparer?: (a: TProp, b: TProp) => number): T | null;
  }
}

Array.prototype.min = function<T, TProp>(
  selector?: (item: T) => TProp,
  comparer?: (a: TProp, b: TProp) => number
): T | null {
  return min(this, selector, comparer);
};

export default function min<T, TProp>(
  collection: T[],
  selector?: (item: T) => TProp,
  comparer?: (a: TProp, b: TProp) => number
): T | null {
  if (collection.length === 0) {
    throw new EmptyArrayException();
  }

  const sel = selector || (x => x);
  const comp: Comparer = comparer || DefaultComparer;

  let result: T | null = null;
  for (const x of collection) {
    if (result == null || comp(sel(x), sel(result)) < 0) {
      result = x;
    }
  }

  return result;
}
