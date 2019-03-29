declare global {
    interface Array<T> {
        first(expression?: (item: T) => boolean): T;
    }
}
export default function first<T>(collection: T[], expression?: (item: T) => boolean): T;
