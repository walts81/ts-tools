declare global {
  interface Array<T> {
    selectMany<TResult>(expression: (item: T) => TResult[]): TResult[];
  }
}

Array.prototype.selectMany = function<T, TResult>(expression: (item: T) => TResult[]): TResult[] {
  return selectMany(this, expression);
};

export default function selectMany<T, TResult>(collection: T[], expression: (item: T) => TResult[]): TResult[] {
  return collection.reduce((a: any[], b: any) => a.concat(expression(b)), []);
}
