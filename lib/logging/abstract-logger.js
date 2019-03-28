"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_level_1 = require("./log-level");
var AbstractLogger = /** @class */ (function () {
    function AbstractLogger(level) {
        if (level === void 0) { level = log_level_1.LogLevel.None; }
        this.level = level;
    }
    AbstractLogger.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, [log_level_1.LogLevel.Debug, message].concat(args));
    };
    AbstractLogger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, [log_level_1.LogLevel.Info, message].concat(args));
    };
    AbstractLogger.prototype.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, [log_level_1.LogLevel.Warn, message].concat(args));
    };
    AbstractLogger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, [log_level_1.LogLevel.Error, message].concat(args));
    };
    AbstractLogger.prototype.canLog = function (level) {
        return this.level <= level;
    };
    AbstractLogger.prototype.logAtLevel = function (level, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (this.canLog(level)) {
            this.doLog.apply(this, [level, message].concat(args));
        }
    };
    return AbstractLogger;
}());
exports.AbstractLogger = AbstractLogger;
