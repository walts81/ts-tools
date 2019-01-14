import { expect } from 'chai';
import 'mocha';
import { KeyCodeHelper } from './key-code-helper';

describe('KeyCodeHelper', () => {
  describe('isKeyCode', () => {
    it('should return true when matches specified keyCode', () => {
      const orig = 1;
      const test = 1;
      const args: any = { which: orig };
      const result = KeyCodeHelper.isKeyCode(args, test);
      expect(result).to.equal(true);
    });

    it('should return false when not matches specified keyCode', () => {
      const orig = 1;
      const test = 2;
      const args: any = { which: orig };
      const result = KeyCodeHelper.isKeyCode(args, test);
      expect(result).to.equal(false);
    });
  });

  describe('isEnterKey', () => {
    it('should return true when .which is 13', () => {
      const args: any = { which: 13 };
      const result = KeyCodeHelper.isEnterKey(args);
      expect(result).to.equal(true);
    });

    it('should return true when .keyCode is 13', () => {
      const args: any = { keyCode: 13 };
      const result = KeyCodeHelper.isEnterKey(args);
      expect(result).to.equal(true);
    });

    it('should return true when .charCode is 13', () => {
      const args: any = { charCode: 13 };
      const result = KeyCodeHelper.isEnterKey(args);
      expect(result).to.equal(true);
    });

    it('should return false when not 13', () => {
      const args: any = { which: 1 };
      const result = KeyCodeHelper.isEnterKey(args);
      expect(result).to.equal(false);
    });
  });

  describe('isEscKey', () => {
    it('should return true when .which is 27', () => {
      const args: any = { which: 27 };
      const result = KeyCodeHelper.isEscKey(args);
      expect(result).to.equal(true);
    });

    it('should return true when .keyCode is 27', () => {
      const args: any = { keyCode: 27 };
      const result = KeyCodeHelper.isEscKey(args);
      expect(result).to.equal(true);
    });

    it('should return true when .charCode is 27', () => {
      const args: any = { charCode: 27 };
      const result = KeyCodeHelper.isEscKey(args);
      expect(result).to.equal(true);
    });

    it('should return false when not 27', () => {
      const args: any = { which: 1 };
      const result = KeyCodeHelper.isEscKey(args);
      expect(result).to.equal(false);
    });
  });

  describe('getKeyCode', () => {
    it('should return .which when exists', () => {
      const orig = 1;
      const args: any = { which: orig };
      const result = KeyCodeHelper.getKeyCode(args);
      expect(result).to.equal(orig);
    });

    it('should return .keyCode when exists', () => {
      const orig = 1;
      const args: any = { keyCode: orig };
      const result = KeyCodeHelper.getKeyCode(args);
      expect(result).to.equal(orig);
    });

    it('should return .charCode when exists', () => {
      const orig = 1;
      const args: any = { charCode: orig };
      const result = KeyCodeHelper.getKeyCode(args);
      expect(result).to.equal(orig);
    });
  });
});
