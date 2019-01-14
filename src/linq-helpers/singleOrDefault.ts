import { MultipleMatchException } from './_common';

declare global {
  interface Array<T> {
    singleOrDefault(expression?: (item: T) => boolean): T | null;
  }
}

Array.prototype.singleOrDefault = function<T>(expression?: (item: T) => boolean): T | null {
  return singleOrDefault(this, expression);
};

export default function singleOrDefault<T>(collection: T[], expression?: (item: T) => boolean): T | null {
  if (collection.length === 0) {
    return null;
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

  return result;
}
