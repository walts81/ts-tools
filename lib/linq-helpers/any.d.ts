declare global {
    interface Array<T> {
        any(expression: (item: T) => boolean): boolean;
    }
}
export default function any<T>(collection: T[], expression: (item: T) => boolean): boolean;
