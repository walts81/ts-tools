export interface StorageCacheItem<T = any> {
  expiresOn: string;
  encrypted: boolean;
  data: T;
}

export const noExpire = 'noexpire';

export interface IStorageBase {
  clear(): void;
  clearAsync(): Promise<void>;
  removeItem(key: string): void;
  removeItemAsync(key: string): Promise<void>;
}

export interface IStringStorage extends IStorageBase {
  getItem(key: string): string;
  getItemAsync(key: string): Promise<string>;
  setItem(key: string, value: string): void;
  setItemAsync(key: string, value: string): Promise<void>;
}

export interface IObjectStorage extends IStorageBase {
  getItem<T = any>(key: string): T;
  getItemAsync<T = any>(key: string): Promise<T>;
  setItem<T = any>(key: string, value: T): void;
  setItemAsync<T = any>(key: string, value: T): Promise<void>;
}
