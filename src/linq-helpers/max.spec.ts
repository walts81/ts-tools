import { expect } from 'chai';
import 'mocha';
import './max';

describe('linq.Max', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];
  const collection2 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  it('should throw error when empty array', () => {
    const fn = () => empty.max();
    expect(fn).to.throw('The array is empty');
  });

  it('should return max value (default item/default comparer)', () => {
    const result = collection.max();
    expect(result).to.equal(5);
  });

  it('should return max value (selector/default comparer)', () => {
    const result = collection2.max(x => x.id);
    expect((result as any).id).to.equal(5);
  });

  it('should return max value (selector/custom comparer)', () => {
    const minComparer = (a: number, b: number) => {
      const a2 = a * -1;
      const b2 = b * -1;
      if (a2 === b2) {
        return 0;
      }
      return a2 > b2 ? 1 : -1;
    };
    const result = collection2.max(x => x.id, minComparer);
    expect((result as any).id).to.equal(1);
  });

  it('should return max value (default item/custom comparer)', () => {
    const minComparer = (a: { id: number }, b: { id: number }) => {
      const a2 = a.id * -1;
      const b2 = b.id * -1;
      if (a2 === b2) {
        return 0;
      }
      return a2 > b2 ? 1 : -1;
    };
    const result = collection2.max(undefined, minComparer);
    expect((result as any).id).to.equal(1);
  });
});
