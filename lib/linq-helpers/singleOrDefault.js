"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _common_1 = require("./_common");
Array.prototype.singleOrDefault = function (expression) {
    return singleOrDefault(this, expression);
};
function singleOrDefault(collection, expression) {
    if (collection.length === 0) {
        return null;
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
    return result;
}
exports.default = singleOrDefault;
