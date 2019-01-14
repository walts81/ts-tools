import { expect } from 'chai';
import 'mocha';
import './string-helpers';

describe('StringHelpers', () => {
  describe('IsNullOrEmpty', () => {
    it('should return true when blank string', () => {
      const result = String.isNullOrEmpty('');
      expect(result).to.equal(true);
    });

    it('should return true when null', () => {
      const result = String.isNullOrEmpty(null);
      expect(result).to.equal(true);
    });

    it('should return true when undefined', () => {
      const result = String.isNullOrEmpty(undefined);
      expect(result).to.equal(true);
    });

    it('should return false when whitespace', () => {
      const result = String.isNullOrEmpty('   ');
      expect(result).to.equal(false);
    });

    it('should return false when string contains non-whitespace value(s)', () => {
      const result = String.isNullOrEmpty('test');
      expect(result).to.equal(false);
    });

    it('should return false when not a string', () => {
      const test: any = 1;
      const result = String.isNullOrEmpty(test);
      expect(result).to.equal(false);
    });
  });

  describe('IsNullOrWhitespace', () => {
    it('should return true when blank string', () => {
      const result = String.isNullOrWhitespace('');
      expect(result).to.equal(true);
    });

    it('should return true when null', () => {
      const result = String.isNullOrWhitespace(null);
      expect(result).to.equal(true);
    });

    it('should return true when undefined', () => {
      const result = String.isNullOrWhitespace(undefined);
      expect(result).to.equal(true);
    });

    it('should return true when whitespace', () => {
      const result = String.isNullOrWhitespace('   ');
      expect(result).to.equal(true);
    });

    it('should return false when string contains non-whitespace value(s)', () => {
      const result = String.isNullOrWhitespace('test');
      expect(result).to.equal(false);
    });

    it('should return false when not a string', () => {
      const test: any = 1;
      const result = String.isNullOrWhitespace(test);
      expect(result).to.equal(false);
    });
  });
});
