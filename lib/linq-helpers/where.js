"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.where = function (expression) {
    return where(this, expression);
};
function where(collection, expression) {
    var results = [];
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (expression(x) === true) {
            results.push(x);
        }
    }
    return results;
}
exports.default = where;
