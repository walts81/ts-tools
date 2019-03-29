declare global {
    interface GroupedItems<T, TKey> {
        key: TKey;
        items: T[];
    }
    interface Array<T> {
        groupBy<TKey>(expression: (item: T) => TKey): GroupedItems<T, TKey>[];
    }
}
export default function groupBy<T, TKey>(collection: T[], expression: (item: T) => TKey): GroupedItems<T, TKey>[];
