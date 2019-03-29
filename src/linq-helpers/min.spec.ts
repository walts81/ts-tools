import { expect } from 'chai';
import 'mocha';
import './min';

describe('linq.min', () => {
  const empty: any[] = [];
  const collection = [1, 2, 3, 4, 5];
  const collection2 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  it('should throw error when empty array', () => {
    const fn = () => empty.min();
    expect(fn).to.throw('The array is empty');
  });

  it('should return min value (default item/default comparer)', () => {
    const result = collection.min();
    expect(result).to.equal(1);
  });

  it('should return min value (selector/default comparer)', () => {
    const result = collection2.min(x => x.id);
    expect((result as any).id).to.equal(1);
  });

  it('should return min value (selector/custom comparer)', () => {
    const maxComparer = (a: number, b: number) => {
      const a2 = a * -1;
      const b2 = b * -1;
      if (a2 === b2) {
        return 0;
      }
      return a2 > b2 ? 1 : -1;
    };
    const result = collection2.min(x => x.id, maxComparer);
    expect((result as any).id).to.equal(5);
  });

  it('should return min value (default item/custom comparer)', () => {
    const maxComparer = (a: { id: number }, b: { id: number }) => {
      const a2 = a.id * -1;
      const b2 = b.id * -1;
      if (a2 === b2) {
        return 0;
      }
      return a2 > b2 ? 1 : -1;
    };
    const result = collection2.min(undefined, maxComparer);
    expect((result as any).id).to.equal(5);
  });
});
