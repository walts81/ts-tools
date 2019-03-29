import { expect } from 'chai';
import 'mocha';
import './singleOrDefault';

describe('linq.singleOrDefault', () => {
  const empty: any[] = [];
  const single = [1];
  const collection = [1, 2, 3, 4, 5];
  const multipleError = 'Multiple matches found';

  it('should return item at index zero when no predicate provided and only one item exists', () => {
    const result = single.singleOrDefault();
    expect(result).to.equal(1);
  });

  it('should return only item that matches predicate', () => {
    const result = collection.singleOrDefault(x => x === 3);
    expect(result).to.equal(3);
  });

  it('should not throw error when no item matches predicate', () => {
    const fn = () => collection.singleOrDefault(x => x > 5);
    expect(fn).to.not.throw();
  });

  it('should not throw error when empty array and no predicate provided', () => {
    const fn = () => empty.singleOrDefault();
    expect(fn).to.not.throw();
  });

  it('should not throw error when empty array and predicate is provided', () => {
    const fn = () => empty.singleOrDefault(x => x > 0);
    expect(fn).to.not.throw();
  });

  it('should throw error when more than one item matches predicate', () => {
    const fn = () => collection.singleOrDefault(x => x > 1);
    expect(fn).to.throw(multipleError);
  });

  it('should throw error when no predicate provided and more than one item exists', () => {
    const fn = () => collection.singleOrDefault();
    expect(fn).to.throw(multipleError);
  });

  it('should return null when no item matches predicate', () => {
    const result = collection.singleOrDefault(x => x > 5);
    expect(result).to.be.null;
  });

  it('should return null when empty array and no predicate provided', () => {
    const result = empty.singleOrDefault();
    expect(result).to.be.null;
  });

  it('should return null when empty array and predicate is provided', () => {
    const result = empty.singleOrDefault(x => x > 0);
    expect(result).to.be.null;
  });
});
