declare global {
    interface Array<T> {
        last(expression?: (item: T) => boolean): T;
    }
}
export default function last<T>(collection: T[], expression?: (item: T) => boolean): T;
