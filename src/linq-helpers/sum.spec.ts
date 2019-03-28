import { expect } from 'chai';
import 'mocha';
import './sum';

describe('linq.sum', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];
  const collection2 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  it('should return zero when array is empty', () => {
    const result = empty.sum();
    expect(result).to.equal(0);
  });

  it('should return sum when no selector provided', () => {
    const result = collection.sum();
    expect(result).to.equal(15);
  });

  it('should return sum when selector is provided', () => {
    const result = collection2.sum(x => x.id);
    expect(result).to.equal(15);
  });
});
