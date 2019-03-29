import { expect } from 'chai';
import 'mocha';
import './lastOrDefault';

describe('linq.lastOrDefault', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return item at index (length - 1) when no predicate provided', () => {
    const result = collection.lastOrDefault();
    expect(result).to.equal(5);
  });

  it('should return last item that matches predicate', () => {
    const result = collection.lastOrDefault(x => x > 1);
    expect(result).to.equal(5);
  });

  it('should not throw error when no item matches predicate', () => {
    const fn = () => collection.lastOrDefault(x => x > 5);
    expect(fn).to.not.throw();
  });

  it('should not throw error when empty array and no predicate provided', () => {
    const fn = () => empty.lastOrDefault();
    expect(fn).to.not.throw();
  });

  it('should not throw error when empty array and predicate is provided', () => {
    const fn = () => empty.lastOrDefault(x => x > 0);
    expect(fn).to.not.throw();
  });

  it('should return null when no item matches predicate', () => {
    const result = collection.lastOrDefault(x => x > 5);
    expect(result).to.be.null;
  });

  it('should return null when empty array and no predicate provided', () => {
    const result = empty.lastOrDefault();
    expect(result).to.be.null;
  });

  it('should return null when empty array and predicate is provided', () => {
    const result = empty.lastOrDefault(x => x > 0);
    expect(result).to.be.null;
  });
});
