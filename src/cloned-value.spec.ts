import { expect } from 'chai';
import 'mocha';
import { ClonedValue } from './cloned-value';
import { areObjectsEquivalent } from './equivalent-objects';
import { LogLevel } from './logging/log-level';
import sinon from 'sinon';

describe('clonedValue', () => {
  describe('originalValue', () => {
    it('should not change after update', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      clone.value.val = 'modified';
      const result = clone.originalValue;
      expect(result.val).to.not.equal('modified');
      expect(result.val).to.equal(originalValue.val);
    });
  });

  describe('value', () => {
    it('should return original value before any changes have been made', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      const result = areObjectsEquivalent(originalValue, clone.value);
      expect(result).to.be.true;
    });

    it('should revert to originalValue on revert', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      clone.value.val = 'modified';
      clone.revert();
      const result = clone.value;
      expect(result.val).to.equal(originalValue.val);
    });

    it('should return defaultValue when no original value exists', () => {
      const originalValue: any = null;
      const defaultValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, defaultValue);
      const result = clone.value;
      expect(result).to.equal(defaultValue);
    });
  });

  describe('hasChanged', () => {
    it('should return false before any changes have been made', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      const result = clone.hasChanged();
      expect(result).to.be.false;
    });

    it('should return true after change', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      clone.value.val = 'modified';
      const result = clone.hasChanged();
      expect(result).to.be.true;
    });

    it('should return false after revert', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      clone.value.val = 'modified';
      clone.revert();
      const result = clone.hasChanged();
      expect(result).to.be.false;
    });

    it('should return false after sync', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      clone.value.val = 'modified';
      clone.sync();
      const result = clone.hasChanged();
      expect(result).to.be.false;
    });
  });

  describe('sync', () => {
    it('should update original value', () => {
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue);
      clone.value.val = 'updated';
      let result = clone.originalValue;
      expect(result.val).to.equal('test');
      clone.sync();
      result = clone.originalValue;
      expect(result.val).to.equal('updated');
    });
  });

  describe('value update', () => {
    it('should execute callback on update of non-null value', () => {
      const spy = sinon.spy();
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, spy);
      const update = { val: 'updated' };
      clone.value = update;
      expect(spy.calledWith(update)).to.be.true;
    });

    it('should not execute callback on update of null value', () => {
      const spy = sinon.spy();
      const originalValue: any = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, spy);
      clone.value = null;
      expect(spy.notCalled).to.be.true;
    });
  });

  describe('logDiff', () => {
    it(`should log 'No differences' when hasChanged === false`, () => {
      const spy = sinon.spy();
      const logger: any = { logAtLevel: spy };
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, () => {}, logger);
      clone.logDiff(LogLevel.Debug);
      expect(spy.calledWith(LogLevel.Debug, 'clone test: No differences')).to.be.true;
    });

    it(`should log 'Has differences' when hasChanged === true`, () => {
      const spy = sinon.spy();
      const logger: any = { logAtLevel: spy };
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, () => {}, logger);
      clone.value.val = 'modified';
      clone.logDiff(LogLevel.Debug);
      expect(spy.calledWith(LogLevel.Debug, 'clone test: Has differences')).to.be.true;
    });

    it(`should log originalValue when hasChanged === true`, () => {
      const spy = sinon.spy();
      const logger: any = { logAtLevel: spy };
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, () => {}, logger);
      clone.value.val = 'modified';
      clone.logDiff(LogLevel.Debug);
      expect(spy.calledWith(LogLevel.Debug, 'clone test - Original:')).to.be.true;
      expect(spy.calledWith(LogLevel.Debug, clone.originalValue)).to.be.true;
    });

    it(`should log clonedValue when hasChanged === true`, () => {
      const spy = sinon.spy();
      const logger: any = { logAtLevel: spy };
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, () => {}, logger);
      clone.value.val = 'modified';
      clone.logDiff(LogLevel.Debug);
      expect(spy.calledWith(LogLevel.Debug, '  clone test - Cloned:')).to.be.true;
      expect(spy.calledWith(LogLevel.Debug, clone.value)).to.be.true;
    });

    it('should log to Info when level not specified', () => {
      const spy = sinon.spy();
      const logger: any = { logAtLevel: spy };
      const originalValue = { val: 'test' };
      const clone = new ClonedValue('clone test', () => originalValue, {}, () => {}, logger);
      clone.logDiff();
      expect(spy.calledWith(LogLevel.Info, 'clone test: No differences')).to.be.true;
    });
  });
});
