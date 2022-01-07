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

    it('should create deep copy by default', () => {
      const orig = [
        { id: 1, val: '1' },
        { id: 2, val: '2' },
        { id: 3, val: '3' },
      ];
      const test = orig.clone();
      expect(test).not.to.eq(orig);
      test.forEach((v, i) => expect(v).not.to.eq(orig[i]));
    });

    it('should create shallow copy when specified', () => {
      const orig = [
        { id: 1, val: '1' },
        { id: 2, val: '2' },
        { id: 3, val: '3' },
      ];
      const test = orig.clone(true);
      expect(test).not.to.eq(orig);
      expect(test).to.eql(orig);
      test.forEach((v, i) => expect(v).to.eq(orig[i]));
    });
  });
});
