declare global {
    interface Array<T> {
        count(expression?: (item: T) => boolean): number;
    }
}
export default function count<T>(collection: T[], expression?: (item: T) => boolean): number;
