import { expect } from 'chai';
import 'mocha';
import * as DateHelpers from './date-helpers';

describe('date-helpers', () => {
  describe('isDate', () => {
    it('should return false when not valid date', () => {
      const dt = 'not_a_date';
      const result = DateHelpers.isDate(dt);
      expect(result).to.be.false;
    });
    it('should return false when null', () => {
      const result = DateHelpers.isDate(null);
      expect(result).to.be.false;
    });
  });
});
