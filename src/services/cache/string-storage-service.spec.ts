import { expect } from 'chai';
import 'mocha';
import { StringStorageService } from './string-storage-service';
import { MockStringStorage } from './mock-storage';

describe('StringStorageService', () => {
  describe('getItem should', () => {
    it('return JSON parsed value when key found', () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      mock.setItem(key, JSON.stringify('test-data'));
      const result = service.getItem(key);
      expect(result).to.eq('test-data');
    });
    it('return undefined when key not found', () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      const result = service.getItem(key);
      expect(result).to.be.undefined;
    });
  });
  describe('getItemAsync should', () => {
    it('return JSON parsed value when key found', async () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      mock.setItem(key, JSON.stringify('test-data'));
      const result = await service.getItemAsync(key);
      expect(result).to.eq('test-data');
    });
    it('return undefined when key not found', async () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      const result = await service.getItemAsync(key);
      expect(result).to.be.undefined;
    });
  });
  describe('setItem should', () => {
    it('set JSON stringified value', () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      service.setItem(key, { data: 'test-data' });
      const item = mock.getItem(key);
      const result = JSON.parse(item);
      expect(result.data).to.eq('test-data');
    });
    it('set undefined correctly', () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      service.setItem(key, undefined);
      const result = service.getItem(key);
      expect(result).to.be.undefined;
    });
    it('set null correctly', () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      service.setItem(key, null);
      const result = service.getItem(key);
      expect(result).to.be.null;
    });
  });
  describe('setItemAsync should', () => {
    it('set JSON stringified value', async () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      await service.setItemAsync(key, { data: 'test-data' });
      const item = mock.getItem(key);
      const result = JSON.parse(item);
      expect(result.data).to.eq('test-data');
    });
    it('set undefined correctly', async () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      await service.setItemAsync(key, undefined);
      const result = service.getItem(key);
      expect(result).to.be.undefined;
    });
    it('set null correctly', async () => {
      const mock = new MockStringStorage();
      const service = new StringStorageService(mock);
      const key = 'test';
      await service.setItemAsync(key, null);
      const result = service.getItem(key);
      expect(result).to.be.null;
    });
  });
  describe('removeItem should', () => {
    it('remove item when key found', () => {
      const mock = new MockStringStorage();
      const key = 'test';
      mock.setItem(key, 'test-data');

      expect(mock.getKeys().length).to.eq(1);

      const service = new StringStorageService(mock);
      service.removeItem(key);
      expect(mock.getKeys().length).to.eq(0);
    });
    it('do nothing when key not found', () => {
      const mock = new MockStringStorage();
      const key = 'test';
      mock.setItem(key, 'test-data');

      expect(mock.getKeys().length).to.eq(1);

      const service = new StringStorageService(mock);
      service.removeItem(key + '1');
      expect(mock.getKeys().length).to.eq(1);
    });
  });
  describe('removeItemAsync should', () => {
    it('remove item when key found', async () => {
      const mock = new MockStringStorage();
      const key = 'test';
      mock.setItem(key, 'test-data');

      expect(mock.getKeys().length).to.eq(1);

      const service = new StringStorageService(mock);
      await service.removeItemAsync(key);
      expect(mock.getKeys().length).to.eq(0);
    });
    it('do nothing when key not found', async () => {
      const mock = new MockStringStorage();
      const key = 'test';
      mock.setItem(key, 'test-data');

      expect(mock.getKeys().length).to.eq(1);

      const service = new StringStorageService(mock);
      await service.removeItemAsync(key + '1');
      expect(mock.getKeys().length).to.eq(1);
    });
  });
  describe('clear should', () => {
    it('remove all items', () => {
      const mock = new MockStringStorage();
      mock.setItem('test1', 'test-data-1');
      mock.setItem('test2', 'test-data-2');
      mock.setItem('test3', 'test-data-3');

      expect(mock.getKeys().length).to.eq(3);

      const service = new StringStorageService(mock);
      service.clear();
      expect(mock.getKeys().length).to.eq(0);
    });
  });
  describe('clearAsync should', () => {
    it('remove all items', async () => {
      const mock = new MockStringStorage();
      mock.setItem('test1', 'test-data-1');
      mock.setItem('test2', 'test-data-2');
      mock.setItem('test3', 'test-data-3');

      expect(mock.getKeys().length).to.eq(3);

      const service = new StringStorageService(mock);
      await service.clearAsync();
      expect(mock.getKeys().length).to.eq(0);
    });
  });
});
