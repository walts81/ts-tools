declare global {
    interface Array<T> {
        all(expression: (item: T) => boolean): boolean;
    }
}
export default function all<T>(collection: T[], expression: (item: T) => boolean): boolean;
