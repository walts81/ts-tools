declare global {
    interface Array<T> {
        lastOrDefault(expression?: (item: T) => boolean): T | null;
    }
}
export default function lastOrDefault<T>(collection: T[], expression?: (item: T) => boolean): T | null;
