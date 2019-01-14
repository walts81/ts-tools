import { TimeoutCachedItem, TimeoutType } from './timeout-cached-item';

export class TimeoutCachedStorageItem extends TimeoutCachedItem<string, string> {
  constructor(
    protected storage: Storage,
    protected keyPrefix: string,
    key: string,
    timeout: number,
    timeoutType: TimeoutType,
    protected storageTimeout: number,
    protected storageTimeoutType: TimeoutType,
    getValueDelegate: (key: string) => Promise<string>
  ) {
    super(key, timeout, timeoutType, getValueDelegate);
    const value = this.getValueFromStorage();
    if (value) {
      this.lastRenewed = new Date();
      this.value = value;
    }
  }

  protected async getValueImplementation(): Promise<string> {
    const value = await super.getValueImplementation();
    this.setValueInStorage(value);
    return value;
  }

  private setValueInStorage(value: string): void {
    const lastRenewed = Date.now();
    const key = this.getStorageKey();
    const obj = { lastRenewed, value };
    this.storage.setItem(key, JSON.stringify(obj));
  }

  private getValueFromStorage(): string {
    const key = this.getStorageKey();
    const valueString = this.storage.getItem(key);
    if (valueString) {
      const obj = JSON.parse(valueString);
      const lastRenewed = new Date(Number(obj.lastRenewed));
      if (!this.shouldRenew(lastRenewed, this.storageTimeout, this.storageTimeoutType)) {
        return obj.value;
      }
    }
    return '';
  }

  private getStorageKey(): string {
    return `${this.keyPrefix}-${this.key}`;
  }
}
