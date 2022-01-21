import { expect } from 'chai';
import 'mocha';
import { JSONCacheStorageService } from './json-cache-storage-service';
import { StorageCacheItem } from './models';
import { MockObjectStorage } from './mock-storage';

describe('StringCacheStorageService', () => {
  describe('isCacheExpired should', () => {
    it('return true when now is greater than expiresOn', () => {
      const expiresOnDt = new Date();
      expiresOnDt.setMinutes(expiresOnDt.getMinutes() - 1);
      const expiresOn = expiresOnDt.toISOString();
      const item: StorageCacheItem = {
        data: null,
        encrypted: false,
        expiresOn,
      };
      const service = new JSONCacheStorageService(new MockObjectStorage());
      const result = service.isCacheExpired(item);
      expect(result).to.be.true;
    });
    it('return false when now is less than expiresOn', () => {
      const expiresOnDt = new Date();
      expiresOnDt.setMinutes(expiresOnDt.getMinutes() + 1);
      const expiresOn = expiresOnDt.toISOString();
      const item: StorageCacheItem = {
        data: null,
        encrypted: false,
        expiresOn,
      };
      const service = new JSONCacheStorageService(new MockObjectStorage());
      const result = service.isCacheExpired(item);
      expect(result).to.be.false;
    });
  });
  describe('setInCache should', () => {
    it('add username to key when specified', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage, () => 'test-user');
      const key = 'test';
      await service.setInCache(key, 'test-data', true, 1);
      const cachedItem: StorageCacheItem = storage.getItem(key + 'test-user');
      expect(cachedItem).to.not.be.null;
      expect(cachedItem).to.not.be.undefined;
      expect(cachedItem.data).to.eq('test-data');
    });
  });
  describe('getFromCache should', () => {
    it('return item from cache', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data');
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return item from cache by username', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', true);
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return item from cache when not found under username', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false);
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return null when not found', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false);
      const data = await service.getFromCache(key + '1');
      expect(data).to.be.null;
    });
    it('return null when expired', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage, () => '');
      const expiresOnDt = new Date();
      expiresOnDt.setMinutes(expiresOnDt.getMinutes() - 1);
      const expiresOn = expiresOnDt.toISOString();
      const item: StorageCacheItem = {
        data: { data: 'test-data' },
        encrypted: false,
        expiresOn,
      };
      const key = 'test-1';
      storage.setItem(key, item);
      const result = await service.getFromCache(key);
      expect(result).to.be.null;
    });
  });
  describe('clear should', () => {
    it('remove item from cache', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data1');

      let keys = storage.getKeys();
      expect(keys.length).to.eq(1);
      await service.clear(key);
      keys = storage.getKeys();
      expect(keys.length).to.eq(0);
    });
    it('remove item by username-key and regular key', async () => {
      const storage = new MockObjectStorage();
      const service = new JSONCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data1');
      await service.setInCache(key, 'test-data2', true);

      let keys = storage.getKeys();
      expect(keys.length).to.eq(2);
      await service.clear(key);
      keys = storage.getKeys();
      expect(keys.length).to.eq(0);
    });
  });
});
