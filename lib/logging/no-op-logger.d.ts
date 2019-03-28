import { AbstractLogger } from './abstract-logger';
import { LogLevel } from './log-level';
export declare class NoOpLogger extends AbstractLogger {
    constructor();
    protected doLog(level: LogLevel, message: any, ...args: any[]): void;
}
declare const logger: NoOpLogger;
export default logger;
