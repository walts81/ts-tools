"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractLogger = void 0;
var log_level_1 = require("./log-level");
var AbstractLogger = /** @class */ (function () {
    function AbstractLogger(level) {
        if (level === void 0) { level = log_level_1.LogLevel.None; }
        this.level = level;
    }
    AbstractLogger.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, __spreadArray([log_level_1.LogLevel.Debug, message], args, false));
    };
    AbstractLogger.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, __spreadArray([log_level_1.LogLevel.Debug, message], args, false));
    };
    AbstractLogger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, __spreadArray([log_level_1.LogLevel.Info, message], args, false));
    };
    AbstractLogger.prototype.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, __spreadArray([log_level_1.LogLevel.Warn, message], args, false));
    };
    AbstractLogger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logAtLevel.apply(this, __spreadArray([log_level_1.LogLevel.Error, message], args, false));
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
            this.doLog.apply(this, __spreadArray([level, message], args, false));
        }
    };
    return AbstractLogger;
}());
exports.AbstractLogger = AbstractLogger;
