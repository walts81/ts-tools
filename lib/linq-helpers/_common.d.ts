export declare class LinqException {
    readonly name: string;
    readonly message: string;
    constructor(name: string, message: string);
}
export declare class NoMatchException extends LinqException {
    constructor();
}
export declare class EmptyArrayException extends LinqException {
    constructor();
}
export declare class MultipleMatchException extends LinqException {
    constructor();
}
export declare type Comparer = (a: any, b: any) => number;
export declare const DefaultComparer: Comparer;
