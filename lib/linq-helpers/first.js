"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
Array.prototype.first = function (expression) {
    return first(this, expression);
};
function first(collection, expression) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    var exp = expression || (function (x) { return true; });
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (exp(x) === true) {
            return x;
        }
    }
    throw new _common_1.NoMatchException();
}
exports.default = first;
