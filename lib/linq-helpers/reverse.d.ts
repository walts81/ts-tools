declare global {
    interface Array<T> {
        reverse(): T[];
    }
}
export default function reverse<T>(collection: T[]): T[];
