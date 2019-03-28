"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
Array.prototype.max = function (selector, comparer) {
    return max(this, selector, comparer);
};
function max(collection, selector, comparer) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    var sel = selector || (function (x) { return x; });
    var comp = comparer || _common_1.DefaultComparer;
    var result = null;
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (result == null || comp(sel(x), sel(result)) > 0) {
            result = x;
        }
    }
    return result;
}
exports.default = max;
