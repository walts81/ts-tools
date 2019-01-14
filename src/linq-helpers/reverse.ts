declare global {
  interface Array<T> {
    reverse(): T[];
  }
}

Array.prototype.reverse = function<T>() {
  return reverse<T>(this);
};

export default function reverse<T>(collection: T[]): T[] {
  const results: T[] = [];
  for (let i = collection.length - 1; i >= 0; i--) {
    results.push(collection[i]);
  }
  return results;
}
