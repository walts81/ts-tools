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
var clone_value_1 = require("./clone-value");
Array.prototype.clone = function (cloneItems) {
    if (cloneItems === void 0) { cloneItems = true; }
    if (cloneItems) {
        return this.map(clone_value_1.cloneValue);
    }
    return __spreadArray([], this, true);
};
