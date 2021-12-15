"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = exports.isDate = exports.formatDate = exports.formatPercent = exports.formatCurrency = exports.PercentOperation = void 0;
var moment_1 = __importDefault(require("moment"));
var PercentOperation;
(function (PercentOperation) {
    PercentOperation[PercentOperation["NoOp"] = 0] = "NoOp";
    PercentOperation[PercentOperation["DivideBy100"] = 1] = "DivideBy100";
    PercentOperation[PercentOperation["MultiplyBy100"] = 2] = "MultiplyBy100";
})(PercentOperation || (PercentOperation = {}));
exports.PercentOperation = PercentOperation;
var formatCurrency = function (value, cents, locale, currency) {
    if (cents === void 0) { cents = false; }
    if (locale === void 0) { locale = 'en-US'; }
    if (currency === void 0) { currency = 'USD'; }
    var val = !!value ? Number(value) : 0;
    var options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: cents ? 2 : 0,
        maximumFractionDigits: cents ? 2 : 0,
    };
    return val.toLocaleString(locale, options);
};
exports.formatCurrency = formatCurrency;
var isDate = function (value) {
    if (!!value) {
        return toString.call(value) === '[object Date]';
    }
    return false;
};
exports.isDate = isDate;
var isValidDate = function (date) {
    var invalidDt = 'Invalid Date';
    if (isDate(date)) {
        return date !== invalidDt;
    }
    if (!!date && typeof date === 'string') {
        var dt = new Date(date);
        return !!dt && dt.toString() !== invalidDt;
    }
    return false;
};
exports.isValidDate = isValidDate;
var formatDate = function (date, format) {
    if (format === void 0) { format = 'MM/DD/YYYY'; }
    if (!date) {
        return '';
    }
    else if (!isValidDate(date)) {
        return '';
    }
    var dt = (0, moment_1.default)(date);
    return dt.format(format);
};
exports.formatDate = formatDate;
var formatPercent = function (value, decimals, operation, includeSymbol) {
    if (decimals === void 0) { decimals = 2; }
    if (operation === void 0) { operation = PercentOperation.NoOp; }
    if (includeSymbol === void 0) { includeSymbol = false; }
    var val = !!value ? Number(value) : 0;
    if (operation === PercentOperation.DivideBy100) {
        val /= 100;
    }
    else if (operation === PercentOperation.MultiplyBy100) {
        val *= 100;
    }
    var formatted = val.toFixed(decimals).toString();
    if (includeSymbol) {
        formatted += '%';
    }
    return formatted;
};
exports.formatPercent = formatPercent;
