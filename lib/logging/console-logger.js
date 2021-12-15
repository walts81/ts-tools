"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
var abstract_logger_1 = require("./abstract-logger");
var log_level_1 = require("./log-level");
var console_1 = __importDefault(require("console"));
var ConsoleLogger = /** @class */ (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleLogger.prototype.doLog = function (level, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        switch (level) {
            case log_level_1.LogLevel.Error:
                console_1.default.error.apply(console_1.default, __spreadArray([message], args, false));
                break;
            case log_level_1.LogLevel.Warn:
                console_1.default.warn.apply(console_1.default, __spreadArray([message], args, false));
                break;
            case log_level_1.LogLevel.Info:
                console_1.default.info.apply(console_1.default, __spreadArray([message], args, false));
                break;
            case log_level_1.LogLevel.Debug:
            default:
                console_1.default.log.apply(console_1.default, __spreadArray([message], args, false));
                break;
        }
    };
    return ConsoleLogger;
}(abstract_logger_1.AbstractLogger));
exports.ConsoleLogger = ConsoleLogger;
