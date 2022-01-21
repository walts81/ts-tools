import { IObjectStorage, IStorageBase, IStringStorage } from './models';

export class StorageServiceBase<T extends IStringStorage | IObjectStorage> implements IStorageBase {
  constructor(protected innerStorage: T) {}

  clear() {
    this.innerStorage.clear();
  }
  async clearAsync() {
    await this.innerStorage.clearAsync();
  }
  removeItem(key: string) {
    this.innerStorage.removeItem(key);
  }
  async removeItemAsync(key: string) {
    await this.innerStorage.removeItemAsync(key);
  }
}
