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
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_logger_1 = require("./abstract-logger");
var log_level_1 = require("./log-level");
var NoOpLogger = /** @class */ (function (_super) {
    __extends(NoOpLogger, _super);
    function NoOpLogger() {
        return _super.call(this, log_level_1.LogLevel.None) || this;
    }
    NoOpLogger.prototype.doLog = function (level, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        // do nothing
    };
    return NoOpLogger;
}(abstract_logger_1.AbstractLogger));
exports.NoOpLogger = NoOpLogger;
var logger = new NoOpLogger();
exports.default = logger;