import { expect } from 'chai';
import 'mocha';
import './selectMany';

describe('linq.SelectMany', () => {
  const empty: Array<{ id: number[] }> = [];
  const collection = [{ id: [1] }, { id: [2] }, { id: [3] }, { id: [4] }, { id: [5] }];

  it('should return empty array when array is empty', () => {
    const result = empty.selectMany(x => x.id);
    expect(result.length).to.equal(0);
  });

  it('should return flattened array', () => {
    const result = collection.selectMany(x => x.id);
    expect(result.length).to.equal(5);
    expect(result[0]).to.equal(1);
    expect(result[1]).to.equal(2);
    expect(result[2]).to.equal(3);
    expect(result[3]).to.equal(4);
    expect(result[4]).to.equal(5);
  });
});
