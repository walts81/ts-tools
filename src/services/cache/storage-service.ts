export interface IStorage {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  clear(): void;
  removeItem(key: string): void;
}

export class StorageService {
  constructor(private innerStorage: IStorage) {}

  getItem<T>(key: string): T {
    const value = this.innerStorage.getItem(key);
    const result: any = !!value ? JSON.parse(value) : value;
    return result as T;
  }
  setItem<T>(key: string, value: T) {
    const valueToStore = JSON.stringify(value);
    this.innerStorage.setItem(key, valueToStore);
  }
  clear() {
    this.innerStorage.clear();
  }
  removeItem(key: string) {
    this.innerStorage.removeItem(key);
  }
}
