"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalSortHelper = void 0;
class NaturalSortHelper {
    constructor() {
        this.getNaturalValueFn = (field1, field2) => {
            return (item) => {
                let val = item[field1];
                if (field2) {
                    val = val[field2];
                }
                return this.getNaturalValue(val);
            };
        };
        this.naturalSort = (a, b, desc) => {
            a = this.getNaturalValue(a);
            b = this.getNaturalValue(b);
            if (a < b) {
                return desc ? 1 : -1;
            }
            if (a > b) {
                return desc ? -1 : 1;
            }
            return 0;
        };
        this.getNaturalValue = (value) => {
            return this.safeString(value).replace(/(\d+)((\.\d+)+)?/g, ($0, integer, decimal, $3) => {
                if (decimal !== $3) {
                    return $0.replace(/(\d+)/g, ($d) => {
                        return this.padding($d) + $d;
                    });
                }
                else {
                    if (!decimal) {
                        decimal = '.0';
                    }
                    for (let i = decimal.length - 1; i >= 0; i--) {
                        if (decimal[i] === '0') {
                            if (i - 1 >= 0 && decimal[i - 1] !== '.') {
                                decimal = decimal.substr(0, i);
                            }
                        }
                    }
                    return this.padding(integer) + integer + decimal + this.padding(decimal);
                }
            });
        };
    }
    padding(value) {
        return '00000000000000000000'.slice(0, value.length);
    }
    safeString(value) {
        if (value == null) {
            return '';
        }
        return ('' + value).trim();
    }
}
exports.NaturalSortHelper = NaturalSortHelper;
