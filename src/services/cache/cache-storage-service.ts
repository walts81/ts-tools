import { IStorage } from './storage-service';
import { Encryption } from './encryption';

export interface StorageCacheItem<T = any> {
  expiresOn: string;
  encrypted: boolean;
  data: T;
}

const defaultExpiresInMinutes = 480;

export class CacheStorageService {
  protected encryption = new Encryption();

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
    return new Promise<void>(resolve => {
      this.storage.removeItem(key);
      const username = this.getUsername();
      const userKey = `${key}${username}`;
      this.storage.removeItem(userKey);
      resolve();
    });
  }

  isCacheExpired(cache: StorageCacheItem): boolean {
    const now = new Date();
    const expiresOn = new Date(cache.expiresOn);
    return now > expiresOn;
  }

  private async encryptData<T>(data: T): Promise<string> {
    return await this.encryption.encryptAsync(JSON.stringify(data));
  }

  private async decryptData<T>(data: string): Promise<T> {
    const decrypted = await this.encryption.decryptAsync(data);
    return JSON.parse(decrypted);
  }

  private getUsername() {
    return !!this.getUsernameFn ? this.getUsernameFn() || '' : '';
  }
}
