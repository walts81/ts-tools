"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.count = function (expression) {
    return count(this, expression);
};
function count(collection, expression) {
    const exp = expression || (x => true);
    let counter = 0;
    for (const x of collection) {
        if (exp(x) === true) {
            counter++;
        }
    }
    return counter;
}
exports.default = count;
