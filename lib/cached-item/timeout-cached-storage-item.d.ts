import { TimeoutCachedItem, TimeoutType } from './timeout-cached-item';
export declare class TimeoutCachedStorageItem extends TimeoutCachedItem<string, string> {
    protected storage: Storage;
    protected keyPrefix: string;
    protected storageTimeout: number;
    protected storageTimeoutType: TimeoutType;
    constructor(storage: Storage, keyPrefix: string, key: string, timeout: number, timeoutType: TimeoutType, storageTimeout: number, storageTimeoutType: TimeoutType, getValueDelegate: (key: string) => Promise<string>, canCacheValueDelegate?: (value: string) => boolean);
    protected getValueImplementation(): Promise<string>;
    private setValueInStorage;
    private getValueFromStorage;
    private getStorageKey;
}
