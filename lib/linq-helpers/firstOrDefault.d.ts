declare global {
    interface Array<T> {
        firstOrDefault(expression?: (item: T) => boolean): T;
    }
}
export default function firstOrDefault<T>(collection: T[], expression?: (item: T) => boolean): T | null;
