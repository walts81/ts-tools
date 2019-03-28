import { expect } from 'chai';
import 'mocha';
import './single';

describe('linq.single', () => {
  const empty: any[] = [];
  const single = [1];
  const collection = [1, 2, 3, 4, 5];
  const noMatchError = 'No match found';
  const emptyError = 'The array is empty';
  const multipleError = 'Multiple matches found';

  it('should return item at index zero when no predicate provided and only one item exists', () => {
    const result = single.single();
    expect(result).to.equal(1);
  });

  it('should return only item that matches predicate', () => {
    const result = collection.single(x => x === 3);
    expect(result).to.equal(3);
  });

  it('should throw error when no item matches predicate', () => {
    const fn = () => collection.single(x => x > 5);
    expect(fn).to.throw(noMatchError);
  });

  it('should throw error when empty array and no predicate provided', () => {
    const fn = () => empty.single();
    expect(fn).to.throw(emptyError);
  });

  it('should throw error when empty array and predicate is provided', () => {
    const fn = () => empty.single(x => x > 0);
    expect(fn).to.throw(emptyError);
  });

  it('should throw error when more than one item matches predicate', () => {
    const fn = () => collection.single(x => x > 1);
    expect(fn).to.throw(multipleError);
  });

  it('should throw error when no predicate provided and more than one item exists', () => {
    const fn = () => collection.single();
    expect(fn).to.throw(multipleError);
  });
});
