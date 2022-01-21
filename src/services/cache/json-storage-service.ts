import { IObjectStorage } from './models';
import { StorageServiceBase } from './storage-service-base';

export class JSONStorageService extends StorageServiceBase<IObjectStorage> {
  constructor(innerStorage: IObjectStorage) {
    super(innerStorage);
  }

  getItem<T = any>(key: string) {
    return this.innerStorage.getItem<T>(key);
  }
  async getItemAsync<T = any>(key: string) {
    return await this.innerStorage.getItemAsync<T>(key);
  }
  setItem<T = any>(key: string, value: T) {
    this.innerStorage.setItem(key, value);
  }
  async setItemAsync<T = any>(key: string, value: T) {
    await this.innerStorage.setItemAsync(key, value);
  }
}
