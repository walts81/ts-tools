import { expect } from 'chai';
import 'mocha';
import { formatCurrency, formatDate, formatPercent, PercentOperation } from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should include currency symbol', () => {
      const num = 5;
      const result = formatCurrency(num, false, 'en-US', 'USD').substr(0, 1);
      expect(result).to.equal('$');
    });

    it('should default to no cents', () => {
      const num = 5;
      const result = formatCurrency(num)
        .substr(1)
        .trim();
      expect(result).to.equal('5');
    });

    it('should include cents when specified', () => {
      const num = 5;
      const result = formatCurrency(num, true)
        .substr(1)
        .trim();
      expect(result).to.equal('5.00');
    });

    it('should default to en-US', () => {
      const num = 5;
      const result = formatCurrency(num, true)
        .substr(1)
        .trim();
      expect(result).to.equal('5.00');
    });

    // it('should respect specified locale', () => {
    //   const num = 5;
    //   // German locale puts currency symbol at the end
    //   let result = formatCurrency(num, true, 'de-DE');
    //   result = result.substr(0, result.length - 1).trim();
    //   expect(result).to.equal('5,00');
    // });

    it('should default currency type to USD', () => {
      const num = 5;
      const result = formatCurrency(num).substr(0, 1);
      expect(result).to.equal('$');
    });

    it('should accept number as string', () => {
      const num = '5.5';
      const result = formatCurrency(num, true);
      expect(result).to.equal('$5.50');
    });

    it('should return zero when called with no number', () => {
      const num = '';
      const result = formatCurrency(num, true);
      expect(result).to.equal('$0.00');
    });

    it('should respect specified currency type', () => {
      const num = 5;
      const result = formatCurrency(num, false, 'en-US', 'EUR').substr(0, 1);
      expect(result).to.equal('€');
    });
  });

  describe('formatDate', () => {
    it('should default to MM/DD/YYYY format', () => {
      const dt = new Date('2019-01-01T00:00:00');
      const result = formatDate(dt);
      expect(result).to.equal('01/01/2019');
    });

    it('should accept date as string', () => {
      const dt = '2019-01-01T00:00:00';
      const result = formatDate(dt);
      expect(result).to.equal('01/01/2019');
    });

    it('should respect specified format', () => {
      const dt = new Date('01/01/2019');
      const result = formatDate(dt, 'YYYY-MM-DD');
      expect(result).to.equal('2019-01-01');
    });

    it('should return empty string when called with empty string', () => {
      const dt = '';
      const result = formatDate(dt);
      expect(result).to.equal('');
    });

    it('should return empty string when called with null', () => {
      const dt: any = null;
      const result = formatDate(dt);
      expect(result).to.equal('');
    });

    it('should return empty string when called with undefined', () => {
      const dt: any = undefined;
      const result = formatDate(dt);
      expect(result).to.equal('');
    });

    it('should return empty string when called with non-date object', () => {
      const dt: any = { value: 1 };
      const result = formatDate(dt);
      expect(result).to.equal('');
    });

    it('should return empty string when called with non-date string', () => {
      const dt = 'this is not a valid date';
      const result = formatDate(dt);
      expect(result).to.equal('');
    });
  });

  describe('formatPercent', () => {
    it('should default to 2 decimal places', () => {
      const num = 5;
      const result = formatPercent(num);
      expect(result).to.equal('5.00');
    });

    it('should default to not include symbol', () => {
      const num = 5;
      const result = formatPercent(num, 0);
      expect(result).to.equal('5');
    });

    it('should respect specified decimal places', () => {
      const num = 5;
      const result = formatPercent(num, 1);
      expect(result).to.equal('5.0');
    });

    it('should include symbol when specified', () => {
      const num = 5;
      const result = formatPercent(num, 2, 0, true);
      expect(result).to.equal('5.00%');
    });

    it('should divide by 100 when specified', () => {
      const num = 5;
      const result = formatPercent(num, 2, PercentOperation.DivideBy100);
      expect(result).to.equal('0.05');
    });

    it('should multiply by 100 when specified', () => {
      const num = 0.05;
      const result = formatPercent(num, 0, PercentOperation.MultiplyBy100);
      expect(result).to.equal('5');
    });

    it('should return zero when called with no number', () => {
      const num = '';
      const result = formatPercent(num, 0);
      expect(result).to.equal('0');
    });

    it('should accept nubmer as string', () => {
      const num = '5';
      const result = formatPercent(num);
      expect(result).to.equal('5.00');
    });
  });
});
