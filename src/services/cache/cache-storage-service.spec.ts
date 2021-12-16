import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import { StorageCacheItem, CacheStorageService } from './cache-storage-service';
import { MockStorage } from './mock-storage';
import { Encryption } from './encryption';

describe('CacheStorageService', () => {
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
      const service = new CacheStorageService(new MockStorage());
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
      const service = new CacheStorageService(new MockStorage());
      const result = service.isCacheExpired(item);
      expect(result).to.be.false;
    });
  });
  describe('setInCache should', () => {
    beforeEach(() => {
      Encryption.prototype.encrypt = sinon.stub().callsFake((x: string) => 'encrypted');
      Encryption.prototype.decrypt = sinon
        .stub()
        .callsFake((x: string) =>
          x === JSON.stringify('encrypted') ? JSON.stringify('test-data') : JSON.stringify(x)
        );
    });
    it('encrypt data when specified', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage);
      const key = 'test';
      await service.setInCache(key, 'test-data', false, true);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.encrypted).to.be.true;
      expect(cachedItem.data).to.not.eq('test-data');
    });
    it('not encrypt data when not specified', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage);
      const key = 'test';
      await service.setInCache(key, 'test-data', false, false);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.encrypted).to.be.false;
    });
    it('add username to key when specified', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage, () => 'test-user');
      const key = 'test';
      await service.setInCache(key, 'test-data', true, false, 1);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key + 'test-user'));
      expect(cachedItem).to.not.be.null;
      expect(cachedItem).to.not.be.undefined;
      expect(cachedItem.data).to.eq('test-data');
    });
  });
  describe('getFromCache should', () => {
    beforeEach(() => {
      Encryption.prototype.encrypt = sinon.stub().callsFake((x: string) => JSON.stringify('encrypted'));
      Encryption.prototype.decrypt = sinon
        .stub()
        .callsFake((x: string) =>
          x === JSON.stringify('encrypted') ? JSON.stringify('test-data') : JSON.stringify(x)
        );
    });
    it('return item from cache', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data');
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return item from cache by username', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', true);
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return item from cache when not found under username', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false);
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return data decrypted', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false, true);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.encrypted).to.be.true;
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return null when not found', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false);
      const data = await service.getFromCache(key + '1');
      expect(data).to.be.null;
    });
    it('return null when expired', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage, () => '');
      const expiresOnDt = new Date();
      expiresOnDt.setMinutes(expiresOnDt.getMinutes() - 1);
      const expiresOn = expiresOnDt.toISOString();
      const item: StorageCacheItem = {
        data: JSON.stringify('test-data'),
        encrypted: false,
        expiresOn,
      };
      const key = 'test-1';
      storage.setItem(key, JSON.stringify(item));
      const result = await service.getFromCache(key);
      expect(result).to.be.null;
    });
  });
  describe('clear should', () => {
    it('remove item from cache', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data1');

      let keys = storage.getKeys();
      expect(keys.length).to.eq(1);
      await service.clear(key);
      keys = storage.getKeys();
      expect(keys.length).to.eq(0);
    });
    it('remove item by username-key and regular key', async () => {
      const storage = new MockStorage();
      const service = new CacheStorageService(storage, () => 'test-user');
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
