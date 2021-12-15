import { IStorage } from './storage-service';

export interface StorageCacheItem<T = any> {
  expiresOn: string;
  encrypted: boolean;
  data: T;
}

const defaultExpiresInMinutes = 480;

export class CacheStorageService {
  constructor(protected storage: IStorage, protected getUsernameFn?: () => string) {}

  async getFromCache<T>(key: string): Promise<T> {
    const username = this.getUsername();
    const keyToUse = `${key}${username}`;
    let item = this.storage.getItem(keyToUse);
    if (!item) {
      item = this.storage.getItem(key);
      if (!item) return null as any;
    }
    const cacheItem: StorageCacheItem = JSON.parse(item);
    if (this.isCacheExpired(cacheItem)) return null as any;
    return cacheItem.encrypted ? await this.decryptData<T>(cacheItem.data) : cacheItem.data;
  }

  async setInCache<T>(
    key: string,
    value: T,
    currentUserOnly = false,
    encrypt = false,
    minutesUntilExpire: number = defaultExpiresInMinutes
  ): Promise<void> {
    const expiresOnDt = new Date();
    expiresOnDt.setMinutes(expiresOnDt.getMinutes() + minutesUntilExpire);
    const expiresOn = expiresOnDt.toISOString();
    const username = currentUserOnly ? this.getUsername() : '';
    const keyToUse = `${key}${username}`;
    const data = encrypt ? await this.encryptData(value) : value;
    const cacheItem = {
      expiresOn,
      encrypted: encrypt,
      data,
    };
    this.storage.setItem(keyToUse, JSON.stringify(cacheItem));
  }

  clear(key: string): Promise<void> {
    return new Promise<void>((resolve) => {
      this.storage.removeItem(key);
      const username = this.getUsername();
      const userKey = `${key}${username}`;
      this.storage.removeItem(userKey);
      resolve();
    });
  }

  public isCacheExpired(cache: StorageCacheItem): boolean {
    const now = new Date();
    const expiresOn = new Date(cache.expiresOn);
    return now > expiresOn;
  }

  private encryptData<T>(data: T): Promise<string> {
    return new Promise<string>((resolve) => {
      const result = btoa(JSON.stringify(data));
      resolve(result);
    });
  }

  private decryptData<T>(data: string): Promise<T> {
    return new Promise<T>((resolve) => {
      const result = JSON.parse(atob(data));
      resolve(result);
    });
  }

  private getUsername() {
    return !!this.getUsernameFn ? this.getUsernameFn() || '' : '';
  }
}
