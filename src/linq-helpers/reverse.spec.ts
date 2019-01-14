import { expect } from 'chai';
import 'mocha';
import './reverse';

describe('linq.Reverse', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];

  it('should return items in reverse order', () => {
    const result = collection.reverse();
    expect(result[0]).to.equal(5);
    expect(result[1]).to.equal(4);
    expect(result[2]).to.equal(3);
    expect(result[3]).to.equal(2);
    expect(result[4]).to.equal(1);
  });

  it('should return empty array when array is empty', () => {
    const result = empty.reverse();
    expect(result.length).to.equal(0);
  });
});
