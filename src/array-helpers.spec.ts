import { expect } from 'chai';
import 'mocha';
import './array-helpers';

describe('ArrayHelpers', () => {
  describe('clone', () => {
    it('should create new array', () => {
      const orig: number[] = [1, 2, 3, 4, 5];
      const test = orig.clone();
      test.push(1);
      expect(orig.length).not.to.equal(test.length);
    });

    it('should create copy', () => {
      const orig: number[] = [1, 2, 3, 4, 5];
      const test = orig.clone();
      expect(orig.length).to.equal(test.length);
      for (let i = 0; i < orig.length; i++) {
        expect(orig[i]).to.equal(test[i]);
      }
    });
  });
});
