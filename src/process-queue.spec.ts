import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import { ProcessQueue } from './process-queue';

class Service extends ProcessQueue<string, string> {
  constructor(private action: (p: string) => string, private reject = false) {
    super();
  }

  protected performAction(payload: string): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.reject) {
          reject(payload);
        } else {
          resolve(this.action(payload));
        }
      }, 10000);
    });
  }

  protected getKey(payload: string): string {
    return payload;
  }
}

describe('ProcessQueue', () => {
  describe('isProcessing', () => {
    it('should return true when busy', async () => {
      const clock = sinon.useFakeTimers();
      const service = new Service(() => 'processed');
      const payload = 'test';
      const promise = service.queue(payload);
      clock.tick(9999);
      const result1 = service.isProcessing(payload);
      expect(result1).to.equal(true);
      clock.tick(1);
      await promise;
      const result2 = service.isProcessing(payload);
      expect(result2).to.equal(false);
    });

    it('should return false when finished', async () => {
      const clock = sinon.useFakeTimers();
      const service = new Service(() => 'processed');
      const payload = 'test';
      const promise = service.queue(payload);
      clock.tick(10000);
      await promise;
      const result = service.isProcessing(payload);
      expect(result).to.equal(false);
    });

    it('should return false when unrecognized payload', () => {
      const clock = sinon.useFakeTimers();
      const service = new Service(() => 'processed');
      const payload = 'test';
      const unrecognized = 'no-test';
      service.queue(payload);
      const result = service.isProcessing(unrecognized);
      clock.tick(10000);
      expect(result).to.equal(false);
    });
  });

  describe('queue', () => {
    it('should queue subsequent calls of existing payload', async () => {
      const clock = sinon.useFakeTimers();
      const fake = sinon.fake.returns('processed');
      const service = new Service(fake);
      const payload = 'test';
      const p1 = service.queue(payload);
      clock.tick(5000);
      const p2 = service.queue(payload);
      clock.tick(5000);
      await Promise.all([p1, p2]);
      expect(fake.callCount).to.equal(1);
      expect(fake.calledWith(payload));
    });

    it('should return processed value', async () => {
      const clock = sinon.useFakeTimers();
      const expectedResult = 'processed';
      const fake = sinon.fake.returns(expectedResult);
      const service = new Service(fake);
      const payload = 'test';
      const p1 = service.queue(payload);
      clock.tick(5000);
      const p2 = service.queue(payload);
      clock.tick(5000);
      const results = await Promise.all([p1, p2]);
      expect(results.length).to.equal(2);
      for (const result of results) {
        expect(result).to.equal(expectedResult);
      }
    });

    it('should reject on failed queued action', async () => {
      const clock = sinon.useFakeTimers();
      const expectedResult = 'processed';
      const service = new Service(() => expectedResult, true);
      const payload = 'test';
      let errorCount = 0;
      const p1 = service.queue(payload).catch(() => errorCount++);
      clock.tick(5000);
      const p2 = service.queue(payload).catch(() => errorCount++);
      clock.tick(5000);
      await Promise.all([p1, p2]);
      expect(errorCount).to.equal(2);
    });
  });
});
