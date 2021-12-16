"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
Array.prototype.last = function (expression) {
    return last(this, expression);
};
function last(collection, expression) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    const exp = expression || (x => true);
    for (let i = collection.length - 1; i >= 0; i--) {
        const item = collection[i];
        if (exp(item) === true) {
            return item;
        }
    }
    throw new _common_1.NoMatchException();
}
exports.default = last;
