import { expect } from 'chai';
import 'mocha';
import './distinct';

describe('linq.distinct', () => {
  const empty: any[] = [];
  const simpleCollection = [1, 2, 3, 4, 5, 5, 5, 5, 5, 4, 4, 4, 3, 3, 2];
  const complexCollection = [
    { id: 1, val: '1' },
    { id: 2, val: '2' },
    { id: 3, val: '3' },
    { id: 4, val: '4' },
    { id: 5, val: '5' },
    { id: 5, val: '5' },
    { id: 5, val: '5' },
    { id: 5, val: '5' },
    { id: 5, val: '5' },
    { id: 4, val: '4' },
    { id: 4, val: '4' },
    { id: 4, val: '4' },
    { id: 3, val: '3' },
    { id: 3, val: '3' },
    { id: 2, val: '2' },
  ];

  it('should return distinct array when not specifying a property', () => {
    const result = simpleCollection.distinct();
    expect(result.length).to.equal(5);
  });

  it('should return distinct array when specifying a property', () => {
    const result1 = complexCollection.distinct(x => x.id);
    const result2 = complexCollection.distinct(x => x.val);
    expect(result1.length).to.equal(5);
    expect(result2.length).to.equal(5);
  });

  it('should return empty array when provided array is empty', () => {
    const result = empty.distinct();
    expect(result.length).to.equal(0);
  });
});
