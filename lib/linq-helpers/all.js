"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.all = function (expression) {
    return all(this, expression);
};
function all(collection, expression) {
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (expression(x) === false) {
            return false;
        }
    }
    return true;
}
exports.default = all;
