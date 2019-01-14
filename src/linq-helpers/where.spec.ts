import { expect } from 'chai';
import 'mocha';
import './where';

describe('linq.Where', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return empty array when no items match predicate', () => {
    const result = collection.where(x => x > 5);
    expect(result.length).to.equal(0);
  });

  it('should return empty array when not items in array', () => {
    const result = empty.where(x => x > 5);
    expect(result.length).to.equal(0);
  });

  it('should return only items that match predicate', () => {
    const result = collection.where(x => x > 4);
    expect(result.length).to.equal(1);
    expect(result[0]).to.equal(5);
  });
});
