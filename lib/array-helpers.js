"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone_value_1 = require("./clone-value");
Array.prototype.clone = function (cloneItems = true) {
    if (cloneItems) {
        return this.map(clone_value_1.cloneValue);
    }
    return [...this];
};
