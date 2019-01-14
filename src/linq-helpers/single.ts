import { EmptyArrayException, MultipleMatchException, NoMatchException } from './_common';

declare global {
  interface Array<T> {
    single(expression?: (item: T) => boolean): T;
  }
}

Array.prototype.single = function<T>(expression?: (item: T) => boolean): T {
  return single(this, expression);
};

export default function single<T>(collection: T[], expression?: (item: T) => boolean): T {
  if (collection.length === 0) {
    throw new EmptyArrayException();
  }

  const exp = expression || (x => true);
  let result: T | null = null;
  for (const x of collection) {
    if (exp(x) === true) {
      if (result == null) {
        result = x;
      } else {
        throw new MultipleMatchException();
      }
    }
  }

  if (result == null) {
    throw new NoMatchException();
  }

  return result;
}
