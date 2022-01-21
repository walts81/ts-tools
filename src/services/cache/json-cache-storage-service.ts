import { IObjectStorage } from './models';
import { StorageCacheItem, noExpire } from './models';

export class JSONCacheStorageService {
  constructor(protected storage: IObjectStorage, protected getUsernameFn?: () => string) {}

  async getFromCache<T = any>(key: string): Promise<T> {
    const username = this.getUsername();
    const keyToUse = `${key}${username}`;
    let item = await this.storage.getItemAsync<StorageCacheItem>(keyToUse);
    if (!item) {
      item = await this.storage.getItemAsync<StorageCacheItem>(key);
      if (!item) return null as any;
    }
    if (this.isCacheExpired(item)) return null as any;
    return item.data;
  }

  async setInCache<T = any>(
    key: string,
    value: T,
    currentUserOnly = false,
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
    const cacheItem = {
      expiresOn,
      encrypted: false,
      data: value,
    };
    await this.storage.setItemAsync(keyToUse, cacheItem);
  }

  async clear(key: string): Promise<void> {
    await this.storage.removeItemAsync(key);
    const username = this.getUsername();
    const userKey = `${key}${username}`;
    await this.storage.removeItemAsync(userKey);
  }

  isCacheExpired(cache: StorageCacheItem): boolean {
    if (!cache.expiresOn || cache.expiresOn === noExpire) return false;
    const now = new Date();
    const expiresOn = new Date(cache.expiresOn);
    return now > expiresOn;
  }

  private getUsername() {
    return !!this.getUsernameFn ? this.getUsernameFn() || '' : '';
  }
}
