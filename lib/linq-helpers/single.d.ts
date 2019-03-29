declare global {
    interface Array<T> {
        single(expression?: (item: T) => boolean): T;
    }
}
export default function single<T>(collection: T[], expression?: (item: T) => boolean): T;
