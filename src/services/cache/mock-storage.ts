import { IStorage } from './storage-service';

export class MockStorage implements IStorage {
  private map: any = {};

  getItem(key: string): string {
    return this.map[key];
  }
  setItem(key: string, value: string): void {
    this.map[key] = value;
  }
  clear(): void {
    this.map = {};
  }
  removeItem(key: string): void {
    delete this.map[key];
  }
  getKeys() {
    return Object.keys(this.map);
  }
}
