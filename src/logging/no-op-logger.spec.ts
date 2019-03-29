import { expect } from 'chai';
import 'mocha';
import { NoOpLogger } from './no-op-logger';
import { LogLevel } from './log-level';

describe('NoOpLogger', () => {
  const logger = new NoOpLogger();
  (logger as any).doLog(LogLevel.Debug, '', '');

  it('should not log debug', () => {
    const result = logger.canLog(LogLevel.Debug);
    expect(result).to.be.false;
  });

  it('should not log info', () => {
    const result = logger.canLog(LogLevel.Info);
    expect(result).to.be.false;
  });

  it('should not log warn', () => {
    const result = logger.canLog(LogLevel.Warn);
    expect(result).to.be.false;
  });

  it('should not log error', () => {
    const result = logger.canLog(LogLevel.Error);
    expect(result).to.be.false;
  });
});
