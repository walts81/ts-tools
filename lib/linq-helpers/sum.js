"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.sum = function (expression) {
    return sum(this, expression);
};
function sum(collection, expression) {
    var exp = expression || (function (x) { return x; });
    var amount = 0;
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        amount += exp(x);
    }
    return amount;
}
exports.default = sum;
