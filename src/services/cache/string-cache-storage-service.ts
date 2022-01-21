import { IStringStorage } from './models';
import { Encryption } from './encryption';
import { StorageCacheItem, noExpire } from './models';

export class StringCacheStorageService {
  protected encryption = new Encryption();

  constructor(protected storage: IStringStorage, protected getUsernameFn?: () => string) {}

  async getFromCache<T>(key: string): Promise<T> {
    const username = this.getUsername();
    const keyToUse = `${key}${username}`;
    let item = await this.storage.getItemAsync(keyToUse);
    if (!item) {
      item = await this.storage.getItemAsync(key);
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
    minutesUntilExpire?: number
  ): Promise<void> {
    let expiresOn = noExpire;
    if (!!minutesUntilExpire && minutesUntilExpire > 0) {
      const expiresOnDt = new Date();
      expiresOnDt.setMinutes(expiresOnDt.getMinutes() + minutesUntilExpire);
      expiresOn = expiresOnDt.toISOString();
    }
    const username = currentUserOnly ? this.getUsername() : '';
    const keyToUse = `${key}${username}`;
    const data = encrypt ? await this.encryptData(value) : value;
    const cacheItem = {
      expiresOn,
      encrypted: encrypt,
      data,
    };
    await this.storage.setItemAsync(keyToUse, JSON.stringify(cacheItem));
  }

  async clear(key: string): Promise<void> {
    await this.storage.removeItemAsync(key);
    const username = this.getUsername();
    const userKey = `${key}${username}`;
    await this.storage.removeItemAsync(userKey);
  }

  isCacheExpired(cache: StorageCacheItem): boolean {
    if (!cache.expiresOn || cache.expiresOn === 'noexpire') return false;
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
