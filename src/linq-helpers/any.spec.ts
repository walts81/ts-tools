import { expect } from 'chai';
import 'mocha';
import './any';

describe('linq.any', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return false when no item matches', () => {
    const result = collection.any(x => x > 5);
    expect(result).to.be.false;
  });

  it('should return true when any item matches', () => {
    const result = collection.any(x => x > 4);
    expect(result).to.be.true;
  });

  it('should return false when array is empty', () => {
    const result = empty.any(x => x > 0);
    expect(result).to.be.false;
  });
});
