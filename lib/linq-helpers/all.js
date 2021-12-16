"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.all = function (expression) {
    return all(this, expression);
};
function all(collection, expression) {
    for (const x of collection) {
        if (expression(x) === false) {
            return false;
        }
    }
    return true;
}
exports.default = all;
