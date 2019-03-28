declare global {
    interface Array<T> {
        select<TResult>(expression: (item: T) => TResult): TResult[];
    }
}
export default function select<T, TResult>(collection: T[], expression: (item: T) => TResult): TResult[];
