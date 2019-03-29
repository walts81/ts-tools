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
/* tslint:disable:max-classes-per-file */
var LinqException = /** @class */ (function () {
    function LinqException(name, message) {
        this.name = name;
        this.message = message;
    }
    return LinqException;
}());
exports.LinqException = LinqException;
var NoMatchException = /** @class */ (function (_super) {
    __extends(NoMatchException, _super);
    function NoMatchException() {
        return _super.call(this, 'NoMatchException', 'No match found') || this;
    }
    return NoMatchException;
}(LinqException));
exports.NoMatchException = NoMatchException;
var EmptyArrayException = /** @class */ (function (_super) {
    __extends(EmptyArrayException, _super);
    function EmptyArrayException() {
        return _super.call(this, 'EmptyArrayException', 'The array is empty') || this;
    }
    return EmptyArrayException;
}(LinqException));
exports.EmptyArrayException = EmptyArrayException;
var MultipleMatchException = /** @class */ (function (_super) {
    __extends(MultipleMatchException, _super);
    function MultipleMatchException() {
        return _super.call(this, 'MultipleMatchException', 'Multiple matches found') || this;
    }
    return MultipleMatchException;
}(LinqException));
exports.MultipleMatchException = MultipleMatchException;
exports.DefaultComparer = function (a, b) { return (a > b ? 1 : a === b ? 0 : -1); };
