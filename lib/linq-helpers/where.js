"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.where = function (expression) {
    return where(this, expression);
};
function where(collection, expression) {
    const results = [];
    for (const x of collection) {
        if (expression(x) === true) {
            results.push(x);
        }
    }
    return results;
}
exports.default = where;
