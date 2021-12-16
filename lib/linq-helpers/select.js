"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.select = function (expression) {
    return select(this, expression);
};
function select(collection, expression) {
    const result = [];
    for (const x of collection) {
        result.push(expression(x));
    }
    return result;
}
exports.default = select;
