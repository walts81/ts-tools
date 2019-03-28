import { expect } from 'chai';
import 'mocha';
import './group-by';

describe('linq.groupBy', () => {
  const empty: any[] = [];
  const collection = [
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

  it('should group based on provided property', () => {
    const groups = collection.groupBy(x => x.id);
    expect(groups.length).to.equal(5);
    for (let i = 0; i < groups.length; i++) {
      expect(groups[i].items.length).to.equal(i + 1);
    }
  });

  it('should return empty array when provided array is empty', () => {
    const groups = empty.groupBy(x => x);
    expect(groups.length).to.equal(0);
  });
});
