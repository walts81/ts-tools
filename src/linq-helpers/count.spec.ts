import { expect } from 'chai';
import 'mocha';
import './count';

describe('linq.count', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return array length when no predicate provided', () => {
    const result = collection.count();
    expect(result).to.equal(5);
  });

  it('should not count items that do not match predicate', () => {
    const result = collection.count(x => x < 5);
    expect(result).to.equal(4);
  });

  it('should return zero when array is empty and no predicate provided', () => {
    const result = empty.count();
    expect(result).to.equal(0);
  });

  it('should return zero when array is empty and predicate is provided', () => {
    const result = empty.count(x => x < 5);
    expect(result).to.equal(0);
  });
});
