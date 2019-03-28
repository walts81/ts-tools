declare global {
    interface Array<T> {
        min<TProp>(selector?: (item: T) => TProp, comparer?: (a: TProp, b: TProp) => number): T | null;
    }
}
export default function min<T, TProp>(collection: T[], selector?: (item: T) => TProp, comparer?: (a: TProp, b: TProp) => number): T | null;
