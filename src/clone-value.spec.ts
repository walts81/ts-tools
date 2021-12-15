import { expect } from 'chai';
import 'mocha';
import { cloneValue } from './clone-value';
import { areObjectsEquivalent } from './equivalent-objects';

describe('cloneValue', () => {
  it('should clone string', () => {
    const a = 'test';
    const b = cloneValue(a);
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should clone number', () => {
    const a = 1;
    const b = cloneValue(a);
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should clone boolean', () => {
    const a = false;
    const b = cloneValue(a);
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should clone date', () => {
    const a = new Date('2019-01-01');
    const b = cloneValue(a);
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should clone complex object', () => {
    const a = { id: 1, val: '1' };
    const b = cloneValue(a);
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should return null when null', () => {
    const a: any = null;
    const b = cloneValue(a);
    expect(b).to.be.null;
  });

  it('should return undefined when undefined', () => {
    const a: any = undefined;
    const b = cloneValue(a);
    expect(b).to.be.undefined;
  });

  it('should return zero when zero', () => {
    const a = 0;
    const b = cloneValue(a);
    expect(b).to.equal(0);
  });
});
