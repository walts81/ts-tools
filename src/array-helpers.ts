interface Array<T> {
  clone(): T[];
}

Array.prototype.clone = function<T>(): T[] {
  return ([] as T[]).concat(this);
};
