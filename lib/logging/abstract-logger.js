"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLogger = void 0;
const log_level_1 = require("./log-level");
class AbstractLogger {
    constructor(level = log_level_1.LogLevel.None) {
        this.level = level;
    }
    log(message, ...args) {
        this.logAtLevel(log_level_1.LogLevel.Debug, message, ...args);
    }
    debug(message, ...args) {
        this.logAtLevel(log_level_1.LogLevel.Debug, message, ...args);
    }
    info(message, ...args) {
        this.logAtLevel(log_level_1.LogLevel.Info, message, ...args);
    }
    warn(message, ...args) {
        this.logAtLevel(log_level_1.LogLevel.Warn, message, ...args);
    }
    error(message, ...args) {
        this.logAtLevel(log_level_1.LogLevel.Error, message, ...args);
    }
    canLog(level) {
        return this.level <= level;
    }
    logAtLevel(level, message, ...args) {
        if (this.canLog(level)) {
            this.doLog(level, message, ...args);
        }
    }
}
exports.AbstractLogger = AbstractLogger;
