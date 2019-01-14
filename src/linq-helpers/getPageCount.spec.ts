import { expect } from 'chai';
import 'mocha';
import './getPageCount';

describe('linq.getPageCount', () => {
  it('should return 1 when total is less than pageSize', () => {
    const result = [1].getPageCount(2);
    expect(result).to.equal(1);
  });

  it('should return 1 when total is equal to pageSize', () => {
    const result = [1, 2].getPageCount(2);
    expect(result).to.equal(1);
  });

  it('should return total divided by pageSize when divides evenly', () => {
    const result = [1, 2].getPageCount(1);
    expect(result).to.equal(2);
  });

  it('should return (total divided by pageSize) plus one when not divided evenly', () => {
    const result = [1, 2, 3, 4, 5].getPageCount(2);
    expect(result).to.equal(3);
  });

  it('should return 1 when total is zero (always 1 page, never zero)', () => {
    const result = [].getPageCount(1);
    expect(result).to.equal(1);
  });
});
