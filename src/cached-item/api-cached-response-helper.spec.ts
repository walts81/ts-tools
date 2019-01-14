import { assert, expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ApiCachedResponseHelper } from './api-cached-response-helper';
import { TimeoutType } from './timeout-cached-item';

describe('ApiCachedResponseHelper', () => {
  it('should hit API when not cached', async () => {
    const httpFake = sinon.fake.returns(Promise.resolve({ status: 200, data: 'from-api' }));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new ApiCachedResponseHelper(
      storage,
      'prefix',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      http
    );
    const value = await service.getFromUrl('url');
    expect(value.data).to.equal('from-api');
    assert(httpFake.calledOnce, 'API was not called exactly once');
  });

  it('should get cached response on subsequent calls', async () => {
    const httpFake = sinon.fake.returns(Promise.resolve({ status: 200, data: 'from-api' }));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new ApiCachedResponseHelper(
      storage,
      'prefix',
      1,
      TimeoutType.InMinutes,
      2,
      TimeoutType.InMinutes,
      http
    );
    const val1 = await service.getFromUrl('url');
    expect(val1.data).to.equal('from-api');
    assert(httpFake.calledOnce, 'API was not called exactly once');

    const val2 = await service.getFromUrl('url');
    expect(val2.data).to.equal('from-api');
    expect(httpFake.callCount).to.equal(1);
  });

  it('should return null on API error', async () => {
    const httpFake = sinon.fake.returns(Promise.reject('API error'));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new ApiCachedResponseHelper(
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

  it('should return null when API response status is not 200', async () => {
    const httpFake = sinon.fake.returns(Promise.resolve({ status: 401 }));
    const http: any = { get: httpFake };
    const storage: any = { getItem: sinon.fake(), setItem: sinon.fake() };
    const service = new ApiCachedResponseHelper(
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
