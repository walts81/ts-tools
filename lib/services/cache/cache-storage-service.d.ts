import { IStorage } from './storage-service';
export interface StorageCacheItem<T = any> {
    expiresOn: string;
    encrypted: boolean;
    data: T;
}
export declare class CacheStorageService {
    protected storage: IStorage;
    protected getUsernameFn?: (() => string) | undefined;
    constructor(storage: IStorage, getUsernameFn?: (() => string) | undefined);
    getFromCache<T>(key: string): Promise<T>;
    setInCache<T>(key: string, value: T, currentUserOnly?: boolean, encrypt?: boolean, minutesUntilExpire?: number): Promise<void>;
    clear(key: string): Promise<void>;
    isCacheExpired(cache: StorageCacheItem): boolean;
    private encryptData;
    private decryptData;
    private getUsername;
}
