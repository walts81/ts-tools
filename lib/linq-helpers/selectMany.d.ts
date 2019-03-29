declare global {
    interface Array<T> {
        selectMany<TResult>(expression: (item: T) => TResult[]): TResult[];
    }
}
export default function selectMany<T, TResult>(collection: T[], expression: (item: T) => TResult[]): TResult[];
