import { expect } from 'chai';
import 'mocha';
import { DefaultComparer } from './_common';

describe('linq._common', () => {
  describe('DefaultComparer', () => {
    it('should return 1 when a is greater than b', () => {
      const result = DefaultComparer(2, 1);
      expect(result).to.equal(1);
    });

    it('should return -1 when a is less than b', () => {
      const result = DefaultComparer(1, 2);
      expect(result).to.equal(-1);
    });

    it('should return zero when a equals b', () => {
      const result = DefaultComparer(1, 1);
      expect(result).to.equal(0);
    });
  });
});
