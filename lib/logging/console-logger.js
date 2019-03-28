"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                console_1.default.error.apply(console_1.default, [message].concat(args));
                break;
            case log_level_1.LogLevel.Warn:
                console_1.default.warn.apply(console_1.default, [message].concat(args));
                break;
            case log_level_1.LogLevel.Info:
                console_1.default.info.apply(console_1.default, [message].concat(args));
                break;
            case log_level_1.LogLevel.Debug:
            default:
                console_1.default.log.apply(console_1.default, [message].concat(args));
                break;
        }
    };
    return ConsoleLogger;
}(abstract_logger_1.AbstractLogger));
exports.ConsoleLogger = ConsoleLogger;
