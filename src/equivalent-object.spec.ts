import { expect } from 'chai';
import 'mocha';
import { areObjectsEquivalent } from './equivalent-objects';

describe('areObjectsEquivalent', () => {
  it('should return true for matching strings', () => {
    const a = 'test';
    const b = 'test';
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should return true for matching numbers', () => {
    const a = 1;
    const b = 1;
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should return true for matching boolean values', () => {
    const a = false;
    const b = false;
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should return true for matching dates', () => {
    const a = new Date('2019-01-01');
    const b = new Date('2019-01-01');
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should return true for matching complex objects', () => {
    const a = { id: 1, val: '1' };
    const b = { id: 1, val: '1' };
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });

  it('should return false for different strings', () => {
    const a = 'test a';
    const b = 'test b';
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false for different numbers', () => {
    const a = 1;
    const b = 2;
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false for different boolean values', () => {
    const a = true;
    const b = false;
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false for different dates', () => {
    const a = new Date('2019-01-01');
    const b = new Date('2019-12-31');
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false for different complex objects', () => {
    const a = { id: 1, val: '1' };
    const b = { id: 1, val: '2' };
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false when A is null and B is not null', () => {
    const a: any = null;
    const b: any = {};
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false when B is null and A is not null', () => {
    const a: any = {};
    const b: any = null;
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false when type of A does not equal type of B', () => {
    const a: any = 'test';
    const b: any = {};
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return false when A has # of props than B', () => {
    const a: any = { id: 1, val: 'test' };
    const b: any = { id: 1 };
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.false;
  });

  it('should return true when A and B are both empty objects', () => {
    const a: any = {};
    const b: any = {};
    const result = areObjectsEquivalent(a, b);
    expect(result).to.be.true;
  });
});
