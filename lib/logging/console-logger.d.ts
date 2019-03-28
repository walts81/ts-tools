import { AbstractLogger } from './abstract-logger';
import { LogLevel } from './log-level';
export declare class ConsoleLogger extends AbstractLogger {
    protected doLog(level: LogLevel, message: any, ...args: any[]): void;
}
