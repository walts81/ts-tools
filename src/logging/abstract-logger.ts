import { Logger } from './logger';
import { LogLevel } from './log-level';

export abstract class AbstractLogger implements Logger {
  constructor(protected level = LogLevel.None) {}

  log(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Debug, message, ...args);
  }

  debug(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Debug, message, ...args);
  }

  info(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Info, message, ...args);
  }

  warn(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Warn, message, ...args);
  }

  error(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Error, message, ...args);
  }

  canLog(level: LogLevel): boolean {
    return this.level <= level;
  }

  logAtLevel(level: LogLevel, message: any, ...args: any[]): void {
    if (this.canLog(level)) {
      this.doLog(level, message, ...args);
    }
  }

  protected abstract doLog(level: LogLevel, message: any, ...args: any[]): void;
}
