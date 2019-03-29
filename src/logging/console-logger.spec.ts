import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import console from 'console';
import { ConsoleLogger } from './console-logger';
import { LogLevel } from './log-level';

describe('ConsoleLogger', () => {
  const originalConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
  let spyConsole: {
    log: sinon.SinonSpy;
    info: sinon.SinonSpy;
    warn: sinon.SinonSpy;
    error: sinon.SinonSpy;
  } = null as any;

  beforeEach(() => {
    spyConsole = {
      log: sinon.spy(),
      info: sinon.spy(),
      warn: sinon.spy(),
      error: sinon.spy(),
    };
    console.log = spyConsole.log;
    console.info = spyConsole.info;
    console.warn = spyConsole.warn;
    console.error = spyConsole.error;
  });

  afterEach(() => {
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  });

  it('should call console.debug on debug', () => {
    const logger = new ConsoleLogger(LogLevel.Debug);
    logger.debug('test', 'arg');
    expect(spyConsole.log.calledWith('test', 'arg')).to.be.true;
  });

  it('should call console.debug on info', () => {
    const logger = new ConsoleLogger(LogLevel.Debug);
    logger.info('test', 'arg');
    expect(spyConsole.info.calledWith('test', 'arg')).to.be.true;
  });

  it('should call console.debug on warn', () => {
    const logger = new ConsoleLogger(LogLevel.Debug);
    logger.warn('test', 'arg');
    expect(spyConsole.warn.calledWith('test', 'arg')).to.be.true;
  });

  it('should call console.debug on error', () => {
    const logger = new ConsoleLogger(LogLevel.Debug);
    logger.error('test', 'arg');
    expect(spyConsole.error.calledWith('test', 'arg')).to.be.true;
  });
});
