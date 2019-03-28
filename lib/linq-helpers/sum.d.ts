declare global {
    interface Array<T> {
        sum(expression?: (item: T) => number): number;
    }
}
export default function sum<T>(collection: T[], expression?: (item: T) => number): number;
