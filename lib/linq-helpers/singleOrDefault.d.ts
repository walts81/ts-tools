declare global {
    interface Array<T> {
        singleOrDefault(expression?: (item: T) => boolean): T | null;
    }
}
export default function singleOrDefault<T>(collection: T[], expression?: (item: T) => boolean): T | null;
