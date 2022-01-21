import { IStringStorage, IObjectStorage, IStorageBase } from './models';

class MockStorageBase implements IStorageBase {
  protected map: any = {};

  clear(): void {
    this.map = {};
  }
  clearAsync(): Promise<void> {
    return new Promise<void>(resolve => {
      this.clear();
      resolve();
    });
  }
  removeItem(key: string): void {
    delete this.map[key];
  }
  removeItemAsync(key: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.removeItem(key);
      resolve();
    });
  }
  getKeys() {
    return Object.keys(this.map);
  }
}

export class MockStringStorage extends MockStorageBase implements IStringStorage {
  getItem(key: string): string {
    return this.map[key];
  }
  getItemAsync(key: string): Promise<string> {
    return new Promise<string>(resolve => {
      const result = this.getItem(key);
      resolve(result);
    });
  }
  setItem(key: string, value: string): void {
    this.map[key] = value;
  }
  setItemAsync(key: string, value: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.setItem(key, value);
      resolve();
    });
  }
}

export class MockObjectStorage extends MockStorageBase implements IObjectStorage {
  getItem<T = any>(key: string): T {
    return this.map[key];
  }
  getItemAsync<T = any>(key: string): Promise<T> {
    return new Promise<T>(resolve => {
      const result = this.getItem<T>(key);
      resolve(result);
    });
  }
  setItem<T = any>(key: string, value: T): void {
    this.map[key] = value;
  }
  setItemAsync<T = any>(key: string, value: T): Promise<void> {
    return new Promise<void>(resolve => {
      this.setItem(key, value);
      resolve();
    });
  }
}
