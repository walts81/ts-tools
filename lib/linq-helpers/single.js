"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
Array.prototype.single = function (expression) {
    return single(this, expression);
};
function single(collection, expression) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    var exp = expression || (function (x) { return true; });
    var result = null;
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (exp(x) === true) {
            if (result == null) {
                result = x;
            }
            else {
                throw new _common_1.MultipleMatchException();
            }
        }
    }
    if (result == null) {
        throw new _common_1.NoMatchException();
    }
    return result;
}
exports.default = single;
