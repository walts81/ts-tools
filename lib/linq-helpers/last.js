"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
Array.prototype.last = function (expression) {
    return last(this, expression);
};
function last(collection, expression) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    var exp = expression || (function (x) { return true; });
    for (var i = collection.length - 1; i >= 0; i--) {
        var item = collection[i];
        if (exp(item) === true) {
            return item;
        }
    }
    throw new _common_1.NoMatchException();
}
exports.default = last;
