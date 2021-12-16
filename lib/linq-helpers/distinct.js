"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.distinct = function (expression) {
    return distinct(this, expression);
};
function distinct(collection, expression = x => x) {
    const results = [];
    const keys = [];
    for (const x of collection) {
        const key = expression(x);
        if (keys.indexOf(key) < 0) {
            keys.push(key);
            results.push(x);
        }
    }
    return results;
}
exports.default = distinct;
