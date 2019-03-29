import { AbstractLogger } from './abstract-logger';
import { LogLevel } from './log-level';
import console from 'console';

export class ConsoleLogger extends AbstractLogger {
  protected doLog(level: LogLevel, message: any, ...args: any[]): void {
    switch (level) {
      case LogLevel.Error:
        console.error(message, ...args);
        break;
      case LogLevel.Warn:
        console.warn(message, ...args);
        break;
      case LogLevel.Info:
        console.info(message, ...args);
        break;
      case LogLevel.Debug:
      default:
        console.log(message, ...args);
        break;
    }
  }
}
