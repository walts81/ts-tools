import { TimeoutCachedStorageItem } from './timeout-cached-storage-item';
import { TimeoutType } from './timeout-cached-item';

interface ValuesDictionary {
  [key: string]: TimeoutCachedStorageItem;
}

export class ApiCachedResponseHelper {
  private values: ValuesDictionary = {};

  constructor(
    private storage: Storage,
    private keyPrefix: string,
    private timeout: number,
    private timeoutType: TimeoutType,
    private storageTimeout: number,
    private storageTimeoutType: TimeoutType,
    protected http: any,
    private canCacheValueDelegate: (value: string) => boolean = () => true
  ) {}

  async getFromUrl(url: string) {
    let cached = this.values[url];
    if (!cached) {
      cached = new TimeoutCachedStorageItem(
        this.storage,
        this.keyPrefix,
        url,
        this.timeout,
        this.timeoutType,
        this.storageTimeout,
        this.storageTimeoutType,
        x => this.getFromApi(x),
        this.canCacheValueDelegate
      );
      this.values[url] = cached;
    }
    const json = await cached.getValue();
    if (json) {
      return JSON.parse(json);
    }
    return null;
  }

  private async getFromApi(url: string) {
    try {
      const response = await this.http.get(url);
      if (response.status === 200) {
        return JSON.stringify(response);
      }
    } catch (err) {
      return '';
    }
    return '';
  }
}
