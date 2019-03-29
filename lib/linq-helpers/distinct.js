"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.distinct = function (expression) {
    return distinct(this, expression);
};
function distinct(collection, expression) {
    if (expression === void 0) { expression = function (x) { return x; }; }
    var results = [];
    var keys = [];
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        var key = expression(x);
        if (keys.indexOf(key) < 0) {
            keys.push(key);
            results.push(x);
        }
    }
    return results;
}
exports.default = distinct;
