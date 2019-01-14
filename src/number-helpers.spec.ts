import { expect } from 'chai';
import 'mocha';
import './number-helpers';

describe('Number.round', () => {
  it('should round up when ends in 5', () => {
    const num = 1.5;
    const result = Number.round(num);
    expect(result).to.equal(2);
  });

  it('should round down when ends in less than 5', () => {
    const num = 1.4;
    const result = Number.round(num);
    expect(result).to.equal(1);
  });

  it('should round up when ends in greater than 5', () => {
    const num = 1.6;
    const result = Number.round(num);
    expect(result).to.equal(2);
  });

  it('should round to specified decimal places', () => {
    const num = 1.65;
    const result = Number.round(num, 1);
    expect(result).to.equal(1.7);
  });
});
