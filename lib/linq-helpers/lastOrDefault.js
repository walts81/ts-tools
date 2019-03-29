"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.lastOrDefault = function (expression) {
    return lastOrDefault(this, expression);
};
function lastOrDefault(collection, expression) {
    var exp = expression || (function (x) { return true; });
    for (var i = collection.length - 1; i >= 0; i--) {
        var item = collection[i];
        if (exp(item) === true) {
            return item;
        }
    }
    return null;
}
exports.default = lastOrDefault;
