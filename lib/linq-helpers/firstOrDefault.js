"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.firstOrDefault = function (expression) {
    return firstOrDefault(this, expression);
};
function firstOrDefault(collection, expression) {
    const exp = expression || (x => true);
    for (const x of collection) {
        if (exp(x) === true) {
            return x;
        }
    }
    return null;
}
exports.default = firstOrDefault;
