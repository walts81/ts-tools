"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
Array.prototype.first = function (expression) {
    return first(this, expression);
};
function first(collection, expression) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    const exp = expression || (x => true);
    for (const x of collection) {
        if (exp(x) === true) {
            return x;
        }
    }
    throw new _common_1.NoMatchException();
}
exports.default = first;
