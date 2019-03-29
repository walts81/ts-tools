declare global {
    interface Array<T> {
        max<TProp>(selector?: (item: T) => TProp, comparer?: (a: TProp, b: TProp) => number): T | null;
    }
}
export default function max<T, TProp>(collection: T[], selector?: (item: T) => TProp, comparer?: (a: TProp, b: TProp) => number): T | null;
