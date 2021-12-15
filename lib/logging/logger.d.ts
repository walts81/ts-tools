import { LogLevel } from './log-level';
export interface Logger {
    log(message: any, ...args: any[]): void;
    debug(message: any, ...args: any[]): void;
    info(message: any, ...args: any[]): void;
    warn(message: any, ...args: any[]): void;
    error(message: any, ...args: any[]): void;
    logAtLevel(level: LogLevel, message: any, ...args: any[]): void;
    canLog(level: LogLevel): boolean;
}
