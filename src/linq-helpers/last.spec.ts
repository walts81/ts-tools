import { expect } from 'chai';
import 'mocha';
import './last';

describe('linq.last', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];
  const noMatchError = 'No match found';
  const emptyError = 'The array is empty';

  it('should return item at index (length - 1) when no predicate provided', () => {
    const result = collection.last();
    expect(result).to.equal(5);
  });

  it('should return last item that matches predicate', () => {
    const result = collection.last(x => x > 1);
    expect(result).to.equal(5);
  });

  it('should throw error when no item matches predicate', () => {
    const fn = () => collection.last(x => x > 5);
    expect(fn).to.throw(noMatchError);
  });

  it('should throw error when empty array and no predicate provided', () => {
    const fn = () => empty.last();
    expect(fn).to.throw(emptyError);
  });

  it('should throw error when empty array and predicate is provided', () => {
    const fn = () => empty.last(x => x > 0);
    expect(fn).to.throw(emptyError);
  });
});
