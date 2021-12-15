declare global {
    interface Array<T> {
        clone(cloneItems?: boolean): T[];
    }
}
export {};
