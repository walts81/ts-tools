import { Logger } from './logger';
import { LogLevel } from './log-level';
export declare abstract class AbstractLogger implements Logger {
    protected level: LogLevel;
    constructor(level?: LogLevel);
    log(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    canLog(level: LogLevel): boolean;
    logAtLevel(level: LogLevel, message: any, ...args: any[]): void;
    protected abstract doLog(level: LogLevel, message: any, ...args: any[]): void;
}
