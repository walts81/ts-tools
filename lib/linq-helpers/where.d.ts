declare global {
    interface Array<T> {
        where(expression: (item: T) => boolean): T[];
    }
}
export default function where<T>(collection: T[], expression: (item: T) => boolean): T[];
