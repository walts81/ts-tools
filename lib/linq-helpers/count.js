"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.count = function (expression) {
    return count(this, expression);
};
function count(collection, expression) {
    var exp = expression || (function (x) { return true; });
    var counter = 0;
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (exp(x) === true) {
            counter++;
        }
    }
    return counter;
}
exports.default = count;
