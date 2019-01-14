declare global {
  interface Array<T> {
    sum(expression?: (item: T) => number): number;
  }
}

Array.prototype.sum = function<T>(expression?: (item: T) => number): number {
  return sum(this, expression);
};

export default function sum<T>(collection: T[], expression?: (item: T) => number): number {
  const exp: ((x: any) => number) = expression || (x => x);
  let amount = 0;
  for (const x of collection) {
    amount += exp(x);
  }
  return amount;
}
