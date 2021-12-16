"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.sum = function (expression) {
    return sum(this, expression);
};
function sum(collection, expression) {
    const exp = expression || (x => x);
    let amount = 0;
    for (const x of collection) {
        amount += exp(x);
    }
    return amount;
}
exports.default = sum;
