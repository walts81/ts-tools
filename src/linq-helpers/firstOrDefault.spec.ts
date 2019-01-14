import { expect } from 'chai';
import 'mocha';
import './firstOrDefault';

describe('linq.FirstOrDefault', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return item at index zero when no predicate provided', () => {
    const result = collection.firstOrDefault();
    expect(result).to.equal(1);
  });

  it('should return first item that matches predicate', () => {
    const result = collection.firstOrDefault(x => x > 1);
    expect(result).to.equal(2);
  });

  it('should not throw error when no item matches predicate', () => {
    const fn = () => collection.firstOrDefault(x => x > 5);
    expect(fn).to.not.throw();
  });

  it('should not throw error when empty array and no predicate provided', () => {
    const fn = () => empty.firstOrDefault();
    expect(fn).to.not.throw();
  });

  it('should not throw error when empty array and predicate is provided', () => {
    const fn = () => empty.firstOrDefault(x => x > 0);
    expect(fn).to.not.throw();
  });

  it('should return null when no item matches predicate', () => {
    const result = collection.firstOrDefault(x => x > 5);
    expect(result).to.be.null;
  });

  it('should return null when empty array and no predicate provided', () => {
    const result = empty.firstOrDefault();
    expect(result).to.be.null;
  });

  it('should return null when empty array and predicate is provided', () => {
    const result = empty.firstOrDefault(x => x > 0);
    expect(result).to.be.null;
  });
});
