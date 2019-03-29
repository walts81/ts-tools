"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.select = function (expression) {
    return select(this, expression);
};
function select(collection, expression) {
    var result = [];
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        result.push(expression(x));
    }
    return result;
}
exports.default = select;
