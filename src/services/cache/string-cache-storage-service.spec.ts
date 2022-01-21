import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import moment from 'moment';
import { StringCacheStorageService } from './string-cache-storage-service';
import { StorageCacheItem } from './models';
import { MockStringStorage } from './mock-storage';
import * as EncryptionHelpers from './encryption-wrappers';

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
      const service = new StringCacheStorageService(new MockStringStorage());
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
      const service = new StringCacheStorageService(new MockStringStorage());
      const result = service.isCacheExpired(item);
      expect(result).to.be.false;
    });
  });
  describe('setInCache should', () => {
    let encryptStub: sinon.SinonStub;
    let decryptStub: sinon.SinonStub;
    beforeEach(() => {
      encryptStub = sinon.stub(EncryptionHelpers, 'encrypt').returns('encrypted');
      decryptStub = sinon
        .stub(EncryptionHelpers, 'decrypt')
        .callsFake(x => (x === 'encrypted' ? JSON.stringify('test-data') : JSON.stringify(x)));
    });
    afterEach(() => {
      encryptStub.restore();
      decryptStub.restore();
    });
    it('encrypt data when specified', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test';
      await service.setInCache(key, 'test-data', false, true);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.encrypted).to.be.true;
      expect(cachedItem.data).to.not.eq('test-data');
    });
    it('not encrypt data when not specified', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test';
      await service.setInCache(key, 'test-data', false, false);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.encrypted).to.be.false;
    });
    it('add username to key when specified', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage, () => 'test-user');
      const key = 'test';
      await service.setInCache(key, 'test-data', true, false, 1);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key + 'test-user'));
      expect(cachedItem).to.not.be.null;
      expect(cachedItem).to.not.be.undefined;
      expect(cachedItem.data).to.eq('test-data');
    });
    it('set expires from specified minutes', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test';
      const minutes = 5;
      await service.setInCache(key, 'test-data', false, false, minutes);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(moment(cachedItem.expiresOn).diff(moment(), 'minutes')).to.eq(minutes);
    });
    it('sets noexpire when no minutes specified', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test';
      await service.setInCache(key, 'test-data', false, false);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.expiresOn).to.eq('noexpire');
    });
  });
  describe('getFromCache should', () => {
    let encryptStub: sinon.SinonStub;
    let decryptStub: sinon.SinonStub;
    beforeEach(() => {
      encryptStub = sinon.stub(EncryptionHelpers, 'encrypt').returns('encrypted');
      decryptStub = sinon
        .stub(EncryptionHelpers, 'decrypt')
        .callsFake(x => (x === 'encrypted' ? JSON.stringify('test-data') : JSON.stringify(x)));
    });
    afterEach(() => {
      encryptStub.restore();
      decryptStub.restore();
    });
    it('return item from cache', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data');
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return item from cache by username', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', true);
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return item from cache when not found under username', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false);
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return data decrypted', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false, true);
      const cachedItem: StorageCacheItem = JSON.parse(storage.getItem(key));
      expect(cachedItem.encrypted).to.be.true;
      const data = await service.getFromCache(key);
      expect(data).to.eq('test-data');
    });
    it('return null when not found', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage, () => 'test-user');
      const key = 'test-1';
      await service.setInCache(key, 'test-data', false);
      const data = await service.getFromCache(key + '1');
      expect(data).to.be.null;
    });
    it('return null when expired', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage, () => '');
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
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage);
      const key = 'test-1';
      await service.setInCache(key, 'test-data1');

      let keys = storage.getKeys();
      expect(keys.length).to.eq(1);
      await service.clear(key);
      keys = storage.getKeys();
      expect(keys.length).to.eq(0);
    });
    it('remove item by username-key and regular key', async () => {
      const storage = new MockStringStorage();
      const service = new StringCacheStorageService(storage, () => 'test-user');
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
