declare global {
    interface Array<T> {
        distinct<TKey = T>(expression?: (item: T) => TKey | T): T[];
    }
}
export default function distinct<T, TKey = T>(collection: T[], expression?: (item: T) => TKey | T): T[];
