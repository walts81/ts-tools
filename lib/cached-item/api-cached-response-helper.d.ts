import { TimeoutType } from './timeout-cached-item';
export declare class ApiCachedResponseHelper {
    private storage;
    private keyPrefix;
    private timeout;
    private timeoutType;
    private storageTimeout;
    private storageTimeoutType;
    protected http: any;
    private canCacheValueDelegate;
    private values;
    constructor(storage: Storage, keyPrefix: string, timeout: number, timeoutType: TimeoutType, storageTimeout: number, storageTimeoutType: TimeoutType, http: any, canCacheValueDelegate?: (value: string) => boolean);
    getFromUrl(url: string): Promise<any>;
    private getFromApi;
}
