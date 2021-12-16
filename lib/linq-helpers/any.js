"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.any = function (expression) {
    return any(this, expression);
};
function any(collection, expression) {
    for (const x of collection) {
        if (expression(x) === true) {
            return true;
        }
    }
    return false;
}
exports.default = any;
