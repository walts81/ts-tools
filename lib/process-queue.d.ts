export declare class DeferredPromise<T> {
    promise: Promise<T>;
    resolve: any;
    reject: any;
    constructor();
}
interface DeferredDictionary<T> {
    [key: string]: {
        id: string;
        deferredList: DeferredPromise<T>[];
        isProcessing: boolean;
    };
}
export declare abstract class ProcessQueue<T, TResult> {
    protected deferredDict: DeferredDictionary<TResult>;
    isProcessing(payload: T): boolean;
    queue(payload: T): Promise<TResult>;
    protected abstract performAction(payload: T): Promise<TResult>;
    protected abstract getKey(payload: T): string;
}
export {};
