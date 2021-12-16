"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = exports.isDate = exports.formatDate = exports.formatPercent = exports.formatCurrency = exports.PercentOperation = void 0;
const moment_1 = __importDefault(require("moment"));
var PercentOperation;
(function (PercentOperation) {
    PercentOperation[PercentOperation["NoOp"] = 0] = "NoOp";
    PercentOperation[PercentOperation["DivideBy100"] = 1] = "DivideBy100";
    PercentOperation[PercentOperation["MultiplyBy100"] = 2] = "MultiplyBy100";
})(PercentOperation || (PercentOperation = {}));
exports.PercentOperation = PercentOperation;
const formatCurrency = (value, cents = false, locale = 'en-US', currency = 'USD') => {
    const val = !!value ? Number(value) : 0;
    const options = {
        style: 'currency',
        currency,
        minimumFractionDigits: cents ? 2 : 0,
        maximumFractionDigits: cents ? 2 : 0,
    };
    return val.toLocaleString(locale, options);
};
exports.formatCurrency = formatCurrency;
const isDate = (value) => {
    if (!!value) {
        return toString.call(value) === '[object Date]';
    }
    return false;
};
exports.isDate = isDate;
const isValidDate = (date) => {
    const invalidDt = 'Invalid Date';
    if (isDate(date)) {
        return date !== invalidDt;
    }
    if (!!date && typeof date === 'string') {
        const dt = new Date(date);
        return !!dt && dt.toString() !== invalidDt;
    }
    return false;
};
exports.isValidDate = isValidDate;
const formatDate = (date, format = 'MM/DD/YYYY') => {
    if (!date) {
        return '';
    }
    else if (!isValidDate(date)) {
        return '';
    }
    const dt = (0, moment_1.default)(date);
    return dt.format(format);
};
exports.formatDate = formatDate;
const formatPercent = (value, decimals = 2, operation = PercentOperation.NoOp, includeSymbol = false) => {
    let val = !!value ? Number(value) : 0;
    if (operation === PercentOperation.DivideBy100) {
        val /= 100;
    }
    else if (operation === PercentOperation.MultiplyBy100) {
        val *= 100;
    }
    let formatted = val.toFixed(decimals).toString();
    if (includeSymbol) {
        formatted += '%';
    }
    return formatted;
};
exports.formatPercent = formatPercent;
