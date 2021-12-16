"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const abstract_logger_1 = require("./abstract-logger");
const log_level_1 = require("./log-level");
const console_1 = __importDefault(require("console"));
class ConsoleLogger extends abstract_logger_1.AbstractLogger {
    doLog(level, message, ...args) {
        switch (level) {
            case log_level_1.LogLevel.Error:
                console_1.default.error(message, ...args);
                break;
            case log_level_1.LogLevel.Warn:
                console_1.default.warn(message, ...args);
                break;
            case log_level_1.LogLevel.Info:
                console_1.default.info(message, ...args);
                break;
            case log_level_1.LogLevel.Debug:
            default:
                console_1.default.log(message, ...args);
                break;
        }
    }
}
exports.ConsoleLogger = ConsoleLogger;
