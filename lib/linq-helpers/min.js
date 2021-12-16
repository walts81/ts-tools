"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
Array.prototype.min = function (selector, comparer) {
    return min(this, selector, comparer);
};
function min(collection, selector, comparer) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    const sel = selector || (x => x);
    const comp = comparer || _common_1.DefaultComparer;
    let result = null;
    for (const x of collection) {
        if (result == null || comp(sel(x), sel(result)) < 0) {
            result = x;
        }
    }
    return result;
}
exports.default = min;
