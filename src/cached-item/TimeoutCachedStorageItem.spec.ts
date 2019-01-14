import { assert, expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { TimeoutCachedStorageItem } from './TimeoutCachedStorageItem';
import { TimeoutType, MILLISECONDS_IN_MINUTE } from './TimeoutCachedItem';

describe('TimeoutCachedStorageItem', () => {
  it('should get value from storage on construction', () => {
    const lastRenewed = Date.now();
    const storageFake = sinon.fake.returns(JSON.stringify({ lastRenewed, value: 'from-storage' }));
    const fake = sinon.fake.returns(Promise.resolve('from-delegate'));
    const storage: any = { getItem: storageFake };
    const service = new TimeoutCachedStorageItem(
      storage,
      'prefix',
      'test',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      fake
    );
    assert(storageFake.calledOnce, 'value not retrieved from storage on construction');
    assert(fake.notCalled, 'delegate was called but should not have been');
  });

  it('should return value from storage on first call', async () => {
    const lastRenewed = Date.now();
    const storageFake = sinon.fake.returns(JSON.stringify({ lastRenewed, value: 'from-storage' }));
    const fake = sinon.fake.returns(Promise.resolve('from-delegate'));
    const storage: any = { getItem: storageFake };
    const service = new TimeoutCachedStorageItem(
      storage,
      'prefix',
      'test',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      fake
    );
    const value = await service.getValue();
    expect(value).to.eq('from-storage');
    assert(storageFake.calledOnce, 'value not retrieved exactly once from storage');
    assert(fake.notCalled, 'delegate was called but should not have been');
  });

  it('should use storage prefix for storage key', () => {
    const lastRenewed = Date.now();
    const storageFake = sinon.fake.returns(JSON.stringify({ lastRenewed, value: 'from-storage' }));
    const storage: any = { getItem: storageFake };
    const service = new TimeoutCachedStorageItem(
      storage,
      'prefix',
      'test',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      () => Promise.resolve('')
    );
    assert(storageFake.calledOnceWith('prefix-test'), 'storage prefix was not used as part of storage key');
  });

  it('should get value from delegate when not found in storage', async () => {
    const storageFake = sinon.fake.returns(null);
    const fake = sinon.fake.returns(Promise.resolve('from-delegate'));
    const storage: any = { getItem: storageFake, setItem: sinon.fake() };
    const service = new TimeoutCachedStorageItem(
      storage,
      'prefix',
      'test',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      fake
    );
    assert(storageFake.calledOnce, 'value not retrieved from storage on construction');
    const value = await service.getValue();
    expect(value).to.eq('from-delegate');
    assert(fake.calledOnceWith('test'), 'delegate not called exactly once with correct key');
  });

  it('should get value from delegate when value from storage is expired', async () => {
    const clock = sinon.useFakeTimers();
    const lastRenewed = clock.now;
    const storage: any = {
      getItem: sinon.fake.returns(JSON.stringify({ lastRenewed, value: 'from-storage' })),
      setItem: sinon.fake(),
    };
    clock.tick(3 * MILLISECONDS_IN_MINUTE);
    const service = new TimeoutCachedStorageItem(
      storage,
      'prefix',
      'test',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      sinon.fake.returns(Promise.resolve('from-delegate'))
    );
    const value = await service.getValue();
    expect(value).to.eq('from-delegate');
  });

  it('should set value in storage after retrieved from delegate', async () => {
    const clock = sinon.useFakeTimers();
    const storageFake = sinon.fake();
    const storage: any = { getItem: sinon.fake.returns(null), setItem: storageFake };
    const service = new TimeoutCachedStorageItem(
      storage,
      'prefix',
      'test',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      sinon.fake.returns(Promise.resolve('from-delegate'))
    );
    const lastRenewed = clock.now;
    const value = await service.getValue();
    assert(
      storageFake.calledOnceWith('prefix-test', JSON.stringify({ lastRenewed, value })),
      'value not set in storage'
    );
  });
});
