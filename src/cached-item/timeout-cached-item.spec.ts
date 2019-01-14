import { assert, expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { TimeoutCachedItem, TimeoutType, MILLISECONDS_IN_MINUTE, MILLISECONDS_IN_DAY } from './timeout-cached-item';

describe('TimeoutCachedItem', () => {
  it('should get value from delegate on first call', async () => {
    const fake = sinon.fake.returns(Promise.resolve('value'));
    const service = new TimeoutCachedItem<string, string>('test', 1, TimeoutType.InSeconds, fake);
    const value = await service.getValue();
    expect(value).to.equal('value');
    assert(fake.calledWith('test'), 'delegate not called with key');
    assert(fake.calledOnce, 'delegate not called exactly once');
  });

  it('should get value from cache on subsequent calls', async () => {
    const fake = sinon.fake.returns(Promise.resolve('value'));
    const service = new TimeoutCachedItem<string, string>('test', 1, TimeoutType.InHours, fake);
    const val1 = await service.getValue();
    expect(val1).to.equal('value');
    assert(fake.calledOnce, 'delegate not called initially');
    const val2 = await service.getValue();
    expect(val2).to.equal('value');
    assert(fake.calledOnce, 'delegate not called exactly once');
  });

  it('should get value from delegate after timeout expires', async () => {
    const clock = sinon.useFakeTimers();
    const fake = sinon.fake.returns(Promise.resolve('value'));
    const service = new TimeoutCachedItem<string, string>('test', 1, TimeoutType.InDays, fake);
    const val1 = await service.getValue();
    expect(val1).to.equal('value');
    assert(fake.calledOnce, 'delegate not called initially');
    clock.tick(MILLISECONDS_IN_DAY - 1);
    const val2 = await service.getValue();
    expect(val2).to.equal('value');
    assert(fake.calledOnce, 'delegate not called exactly once');
    clock.tick(1);
    const val3 = await service.getValue();
    expect(val3).to.equal('value');
    assert(fake.calledTwice, 'delegate not called exactly twice');
  });

  it('should default timeoutType to InMinutes when invalid type specified', async () => {
    const clock = sinon.useFakeTimers();
    const fake = sinon.fake.returns(Promise.resolve('value'));
    const service = new TimeoutCachedItem<string, string>('test', 1, 100, fake);
    const val1 = await service.getValue();
    expect(val1).to.equal('value');
    assert(fake.calledOnce, 'delegate not called initially');
    clock.tick(MILLISECONDS_IN_MINUTE - 1);
    const val2 = await service.getValue();
    expect(val2).to.equal('value');
    assert(fake.calledOnce, 'delegate not called exactly once');
    clock.tick(1);
    const val3 = await service.getValue();
    expect(val3).to.equal('value');
    assert(fake.calledTwice, 'delegate not called exactly twice');
  });
});
