import { Logger } from './logger';
import { LogLevel } from './log-level';

export abstract class AbstractLogger implements Logger {
  constructor(protected level = LogLevel.None) {}

  public log(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Debug, message, ...args);
  }

  public debug(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Debug, message, ...args);
  }

  public info(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Info, message, ...args);
  }

  public warn(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Warn, message, ...args);
  }

  public error(message: any, ...args: any[]): void {
    this.logAtLevel(LogLevel.Error, message, ...args);
  }

  public canLog(level: LogLevel): boolean {
    return this.level <= level;
  }

  public logAtLevel(level: LogLevel, message: any, ...args: any[]): void {
    if (this.canLog(level)) {
      this.doLog(level, message, ...args);
    }
  }

  protected abstract doLog(level: LogLevel, message: any, ...args: any[]): void;
}
