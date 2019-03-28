import { expect } from 'chai';
import 'mocha';
import './all';

describe('linq.all', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return false when any item does not match', () => {
    const result = collection.all(x => x < 5);
    expect(result).to.be.false;
  });

  it('should return true when all items match', () => {
    const result = collection.all(x => x < 6);
    expect(result).to.be.true;
  });

  it('should return true when array is empty', () => {
    const result = empty.all(x => x < 5);
    expect(result).to.be.true;
  });
});
