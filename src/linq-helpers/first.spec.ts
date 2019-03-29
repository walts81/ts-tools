import { expect } from 'chai';
import 'mocha';
import './first';

describe('linq.first', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];
  const noMatchError = 'No match found';
  const emptyError = 'The array is empty';

  it('should return item at index zero when no predicate provided', () => {
    const result = collection.first();
    expect(result).to.equal(1);
  });

  it('should return first item that matches predicate', () => {
    const result = collection.first(x => x > 1);
    expect(result).to.equal(2);
  });

  it('should throw error when no item matches predicate', () => {
    const fn = () => collection.first(x => x > 5);
    expect(fn).to.throw(noMatchError);
  });

  it('should throw error when empty array and no predicate provided', () => {
    const fn = () => empty.first();
    expect(fn).to.throw(emptyError);
  });

  it('should throw error when empty array and predicate is provided', () => {
    const fn = () => empty.first(x => x > 0);
    expect(fn).to.throw(emptyError);
  });
});
