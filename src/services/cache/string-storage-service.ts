import { IStringStorage } from './models';
import { StorageServiceBase } from './storage-service-base';

export class StringStorageService extends StorageServiceBase<IStringStorage> {
  constructor(innerStorage: IStringStorage) {
    super(innerStorage);
  }

  getItem<T>(key: string) {
    const value = this.innerStorage.getItem(key);
    const result: any = !!value ? JSON.parse(value) : value;
    return result as T;
  }
  async getItemAsync<T>(key: string) {
    const value = await this.innerStorage.getItemAsync(key);
    const result: any = !!value ? JSON.parse(value) : value;
    return result as T;
  }
  setItem<T>(key: string, value: T) {
    const valueToStore = JSON.stringify(value);
    this.innerStorage.setItem(key, valueToStore);
  }
  async setItemAsync<T>(key: string, value: T) {
    const valueToStore = JSON.stringify(value);
    await this.innerStorage.setItemAsync(key, valueToStore);
  }
}
