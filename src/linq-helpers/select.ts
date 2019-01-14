declare global {
  interface Array<T> {
    select<TResult>(expression: (item: T) => TResult): TResult[];
  }
}

Array.prototype.select = function<T, TResult>(expression: (item: T) => TResult): TResult[] {
  return select(this, expression);
};

export default function select<T, TResult>(collection: T[], expression: (item: T) => TResult): TResult[] {
  const result: TResult[] = [];
  for (const x of collection) {
    result.push(expression(x));
  }
  return result;
}
