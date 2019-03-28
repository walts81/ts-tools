import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import { AbstractLogger } from './abstract-logger';
import { LogLevel } from './log-level';

class Logger extends AbstractLogger {
  constructor(level: LogLevel, private loggerSpy: sinon.SinonSpy) {
    super(level);
  }

  protected doLog(message: any, ...args: any[]): void {
    this.loggerSpy(message, ...args);
  }
}

class TestableLogger extends AbstractLogger {
  constructor(private loggerSpy: sinon.SinonSpy) {
    super();
  }

  protected doLog(message: any, ...args: any[]): void {
    this.loggerSpy(message, ...args);
  }
}

describe('logger', () => {
  it('should default to no logging', () => {
    const spy = sinon.spy();
    const logger = new TestableLogger(spy);
    logger.error('test');
    expect(spy.calledWith('test')).to.be.false;
  });

  it('should log debug when debug', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Debug, spy);
    logger.debug('test', 'arg');
    expect(spy.calledWith(LogLevel.Debug, 'test', 'arg')).to.be.true;
  });

  it('should log info when debug', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Debug, spy);
    logger.info('test', 'arg');
    expect(spy.calledWith(LogLevel.Info, 'test', 'arg')).to.be.true;
  });

  it('should log warn when debug', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Debug, spy);
    logger.warn('test', 'arg');
    expect(spy.calledWith(LogLevel.Warn, 'test', 'arg')).to.be.true;
  });

  it('should log error when debug', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Debug, spy);
    logger.error('test', 'arg');
    expect(spy.calledWith(LogLevel.Error, 'test', 'arg')).to.be.true;
  });

  it('should not log debug when info', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Info, spy);
    logger.debug('test');
    expect(spy.calledWith(LogLevel.Debug, 'test')).to.be.false;
  });

  it('should log info when info', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Info, spy);
    logger.info('test');
    expect(spy.calledWith(LogLevel.Info, 'test')).to.be.true;
  });

  it('should log warn when info', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Info, spy);
    logger.warn('test');
    expect(spy.calledWith(LogLevel.Warn, 'test')).to.be.true;
  });

  it('should log error when info', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Info, spy);
    logger.error('test');
    expect(spy.calledWith(LogLevel.Error, 'test')).to.be.true;
  });

  it('should not log debug when warn', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Warn, spy);
    logger.debug('test');
    expect(spy.calledWith(LogLevel.Debug, 'test')).to.be.false;
  });

  it('should not log info when warn', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Warn, spy);
    logger.info('test');
    expect(spy.calledWith(LogLevel.Info, 'test')).to.be.false;
  });

  it('should log warn when warn', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Warn, spy);
    logger.warn('test');
    expect(spy.calledWith(LogLevel.Warn, 'test')).to.be.true;
  });

  it('should log error when warn', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Warn, spy);
    logger.error('test');
    expect(spy.calledWith(LogLevel.Error, 'test')).to.be.true;
  });

  it('should not log debug when error', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Error, spy);
    logger.debug('test');
    expect(spy.calledWith(LogLevel.Debug, 'test')).to.be.false;
  });

  it('should not log info when error', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Error, spy);
    logger.info('test');
    expect(spy.calledWith(LogLevel.Info, 'test')).to.be.false;
  });

  it('should not log warn when error', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Error, spy);
    logger.warn('test');
    expect(spy.calledWith(LogLevel.Warn, 'test')).to.be.false;
  });

  it('should log error when error', () => {
    const spy = sinon.spy();
    const logger = new Logger(LogLevel.Error, spy);
    logger.error('test');
    expect(spy.calledWith(LogLevel.Error, 'test')).to.be.true;
  });
});
