import { TimeoutType } from './timeout-cached-item';
export declare class ApiCachedResponseHelper {
    private storage;
    private keyPrefix;
    private timeout;
    private timeoutType;
    private storageTimeout;
    private storageTimeoutType;
    protected http: any;
    private values;
    constructor(storage: Storage, keyPrefix: string, timeout: number, timeoutType: TimeoutType, storageTimeout: number, storageTimeoutType: TimeoutType, http: any);
    getFromUrl(url: string): Promise<any>;
    private getFromApi;
}
