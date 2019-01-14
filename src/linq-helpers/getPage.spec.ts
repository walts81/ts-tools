import { expect } from 'chai';
import 'mocha';
import './getPage';

describe('linq.getPage', () => {
  it('should return all items when collection size is less than pageSize', () => {
    const result = [1, 2, 3, 4, 5].getPage(1, 6);
    expect(result.length).to.equal(5);
    expect(result[0]).to.equal(1);
    expect(result[1]).to.equal(2);
    expect(result[2]).to.equal(3);
    expect(result[3]).to.equal(4);
    expect(result[4]).to.equal(5);
  });

  it('should return last page when requested page is greater than max', () => {
    const result = [1, 2, 3, 4, 5].getPage(6, 1);
    expect(result.length).to.equal(1);
    expect(result[0]).to.equal(5);
  });

  it('should return first page when requested page is zero', () => {
    const result = [1, 2, 3, 4, 5].getPage(0, 1);
    expect(result.length).to.equal(1);
    expect(result[0]).to.equal(1);
  });

  it('should return first page when requested page is negative', () => {
    const result = [1, 2, 3, 4, 5].getPage(-1, 1);
    expect(result.length).to.equal(1);
    expect(result[0]).to.equal(1);
  });

  it('should return correct page', () => {
    const result = [1, 2, 3, 4, 5, 6, 7].getPage(3, 3);
    expect(result.length).to.equal(1);
    expect(result[0]).to.equal(7);
  });
});
