import { assert, expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { CachedApiResponseHelper } from './CachedApiResponseHelper';
import { TimeoutType } from './TimeoutCachedItem';

describe('CachedApiResponseHelper', () => {
  it('should hit API when not cached', async () => {
    const httpFake = sinon.fake.returns(Promise.resolve('from-api'));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new CachedApiResponseHelper(
      storage,
      'prefix',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      http
    );
    const value = await service.getFromUrl('url');
    expect(value).to.eq('from-api');
    assert(httpFake.calledOnce, 'API was not called exactly once');
  });

  it('should get cached response on subsequent calls', async () => {
    const httpFake = sinon.fake.returns(Promise.resolve('from-api'));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new CachedApiResponseHelper(
      storage,
      'prefix',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      http
    );
    const val1 = await service.getFromUrl('url');
    expect(val1).to.eq('from-api');
    assert(httpFake.calledOnce, 'API was not called exactly once');

    const val2 = await service.getFromUrl('url');
    expect(val2).to.eq('from-api');
    expect(httpFake.callCount).to.eq(1);
  });

  it('should return null string on API error', async () => {
    const httpFake = sinon.fake.returns(Promise.reject('API error'));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new CachedApiResponseHelper(
      storage,
      'prefix',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      http
    );
    const value = await service.getFromUrl('url');
    expect(value).to.be.null;
  });
});
