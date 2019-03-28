"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.firstOrDefault = function (expression) {
    return firstOrDefault(this, expression);
};
function firstOrDefault(collection, expression) {
    var exp = expression || (function (x) { return true; });
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (exp(x) === true) {
            return x;
        }
    }
    return null;
}
exports.default = firstOrDefault;
