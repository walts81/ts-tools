"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalSortHelper = void 0;
var NaturalSortHelper = /** @class */ (function () {
    function NaturalSortHelper() {
        var _this = this;
        this.getNaturalValueFn = function (field1, field2) {
            return function (item) {
                var val = item[field1];
                if (field2) {
                    val = val[field2];
                }
                return _this.getNaturalValue(val);
            };
        };
        this.naturalSort = function (a, b, desc) {
            a = _this.getNaturalValue(a);
            b = _this.getNaturalValue(b);
            if (a < b) {
                return desc ? 1 : -1;
            }
            if (a > b) {
                return desc ? -1 : 1;
            }
            return 0;
        };
        this.getNaturalValue = function (value) {
            return _this.safeString(value).replace(/(\d+)((\.\d+)+)?/g, function ($0, integer, decimal, $3) {
                if (decimal !== $3) {
                    return $0.replace(/(\d+)/g, function ($d) {
                        return _this.padding($d) + $d;
                    });
                }
                else {
                    if (!decimal) {
                        decimal = '.0';
                    }
                    for (var i = decimal.length - 1; i >= 0; i--) {
                        if (decimal[i] === '0') {
                            if (i - 1 >= 0 && decimal[i - 1] !== '.') {
                                decimal = decimal.substr(0, i);
                            }
                        }
                    }
                    return _this.padding(integer) + integer + decimal + _this.padding(decimal);
                }
            });
        };
    }
    NaturalSortHelper.prototype.padding = function (value) {
        return '00000000000000000000'.slice(0, value.length);
    };
    NaturalSortHelper.prototype.safeString = function (value) {
        if (value == null) {
            return '';
        }
        return ('' + value).trim();
    };
    return NaturalSortHelper;
}());
exports.NaturalSortHelper = NaturalSortHelper;
