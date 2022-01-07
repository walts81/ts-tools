import { expect } from 'chai';
import 'mocha';
import './string-helpers';

describe('StringHelpers', () => {
  describe('isNullOrEmpty', () => {
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

  describe('isNullOrWhitespace', () => {
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

  describe('trimStartChars', () => {
    it('should trim whitespace by default', () => {
      const val = '   test   ';
      const result = val.trimStartChars();
      expect(result).to.eq('test   ');
    });
    it('should trim specified char', () => {
      const val = 'aaatestaaa';
      const result = val.trimStartChars('a');
      expect(result).to.eq('testaaa');
    });
  });

  describe('trimEndChars', () => {
    it('should trim whitespace by default', () => {
      const val = '   test   ';
      const result = val.trimEndChars();
      expect(result).to.eq('   test');
    });
    it('should trim specified char', () => {
      const val = 'aaatestaaa';
      const result = val.trimEndChars('a');
      expect(result).to.eq('aaatest');
    });
  });

  describe('trimChars', () => {
    it('should trim whitespace by default', () => {
      const val = '   test   ';
      const result = val.trimChars();
      expect(result).to.eq('test');
    });
    it('should trim specified char', () => {
      const val = 'aaatestaaa';
      const result = val.trimChars('a');
      expect(result).to.eq('test');
    });
  });
});
