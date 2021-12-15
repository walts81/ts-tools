import { expect } from 'chai';
import 'mocha';
import { StorageService } from './storage-service';
import { MockStorage } from './mock-storage';

describe('StorageService', () => {
  describe('getItem should', () => {
    it('return JSON parsed value when key found', () => {
      const mock = new MockStorage();
      const service = new StorageService(mock);
      const key = 'test';
      mock.setItem(key, JSON.stringify('test-data'));
      const result = service.getItem(key);
      expect(result).to.eq('test-data');
    });
    it('return undefined when key not found', () => {
      const mock = new MockStorage();
      const service = new StorageService(mock);
      const key = 'test';
      const result = service.getItem(key);
      expect(result).to.be.undefined;
    });
  });
  describe('setItem should', () => {
    it('set JSON stringified value', () => {
      const mock = new MockStorage();
      const service = new StorageService(mock);
      const key = 'test';
      service.setItem(key, { data: 'test-data' });
      const item = mock.getItem(key);
      const result = JSON.parse(item);
      expect(result.data).to.eq('test-data');
    });
    it('set undefined correctly', () => {
      const mock = new MockStorage();
      const service = new StorageService(mock);
      const key = 'test';
      service.setItem(key, undefined);
      const result = service.getItem(key);
      expect(result).to.be.undefined;
    });
    it('set null correctly', () => {
      const mock = new MockStorage();
      const service = new StorageService(mock);
      const key = 'test';
      service.setItem(key, null);
      const result = service.getItem(key);
      expect(result).to.be.null;
    });
  });
  describe('removeItem should', () => {
    it('remove item when key found', () => {
      const mock = new MockStorage();
      const key = 'test';
      mock.setItem(key, 'test-data');

      expect(mock.getKeys().length).to.eq(1);

      const service = new StorageService(mock);
      service.removeItem(key);
      expect(mock.getKeys().length).to.eq(0);
    });
    it('do nothing when key not found', () => {
      const mock = new MockStorage();
      const key = 'test';
      mock.setItem(key, 'test-data');

      expect(mock.getKeys().length).to.eq(1);

      const service = new StorageService(mock);
      service.removeItem(key + '1');
      expect(mock.getKeys().length).to.eq(1);
    });
  });
  describe('clear should', () => {
    it('remove all items', () => {
      const mock = new MockStorage();
      mock.setItem('test1', 'test-data-1');
      mock.setItem('test2', 'test-data-2');
      mock.setItem('test3', 'test-data-3');

      expect(mock.getKeys().length).to.eq(3);

      const service = new StorageService(mock);
      service.clear();
      expect(mock.getKeys().length).to.eq(0);
    });
  });
});
