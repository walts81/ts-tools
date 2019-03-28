import { AbstractLogger } from './abstract-logger';
import { LogLevel } from './log-level';

export class NoOpLogger extends AbstractLogger {
  constructor() {
    super(LogLevel.None);
  }

  protected doLog(level: LogLevel, message: any, ...args: any[]): void {
    // do nothing
  }
}

const logger = new NoOpLogger();
export default logger;
