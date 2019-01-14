import { expect } from 'chai';
import 'mocha';
import { NaturalSortHelper } from './natural-sort-helper';

describe('NaturalSortHelper', () => {
  const service = new NaturalSortHelper();

  describe('getNaturalValueFn', () => {
    it('should return function to get value from specified field', () => {
      const test = service.getNaturalValueFn('a');
      const val = 'test';
      const obj = { a: val };
      const result = test(obj);
      expect(result).to.equal(val);
    });

    it('should return function to get value from specified nested field', () => {
      const test = service.getNaturalValueFn('a', 'b');
      const val = 'test';
      const obj = { a: { b: val } };
      const result = test(obj);
      expect(result).to.equal(val);
    });
  });

  describe('naturalValue', () => {
    it('should return empty string when null', () => {
      const result = service.getNaturalValue(null);
      expect(result).to.equal('');
    });

    it('should surround with padded zeroes for length of digit strings ', () => {
      const val = '1.123';
      const expected = '01.1230000';
      const result = service.getNaturalValue(val);
      expect(result).to.equal(expected);
    });

    it('should prefix number segments with padded zeroes for length of each segment', () => {
      const val = '1.123.456';
      const expected = '01.000123.000456';
      const result = service.getNaturalValue(val);
      expect(result).to.equal(expected);
    });
  });

  describe('naturalSort', () => {
    it('should return 1 when a is greater than b', () => {
      const a = '1.2';
      const b = '1.12';
      const result = service.naturalSort(a, b);
      expect(result).to.equal(1);
    });

    it('should return -1 when a is less than b', () => {
      const a = '1.12';
      const b = '1.2;';
      const result = service.naturalSort(a, b);
      expect(result).to.equal(-1);
    });

    it('should return zero when a equals b', () => {
      const a = '1';
      const b = '1.00';
      const result = service.naturalSort(a, b);
      expect(result).to.equal(0);
    });

    it('should return -1 when a is greater than b and isDesc', () => {
      const a = '1.2';
      const b = '1.12';
      const result = service.naturalSort(a, b, true);
      expect(result).to.equal(-1);
    });

    it('should return 1 when a is less than b and isDesc', () => {
      const a = '1.12';
      const b = '1.2;';
      const result = service.naturalSort(a, b, true);
      expect(result).to.equal(1);
    });

    it('should return zero when a equals b and isDesc', () => {
      const a = '1.00';
      const b = '1';
      const result = service.naturalSort(a, b, true);
      expect(result).to.equal(0);
    });
  });
});
