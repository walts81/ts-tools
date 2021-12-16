"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoOpLogger = void 0;
const abstract_logger_1 = require("./abstract-logger");
const log_level_1 = require("./log-level");
class NoOpLogger extends abstract_logger_1.AbstractLogger {
    constructor() {
        super(log_level_1.LogLevel.None);
    }
    doLog(level, message, ...args) {
        // do nothing
    }
}
exports.NoOpLogger = NoOpLogger;
const logger = new NoOpLogger();
exports.default = logger;
