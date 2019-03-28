"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.any = function (expression) {
    return any(this, expression);
};
function any(collection, expression) {
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        if (expression(x) === true) {
            return true;
        }
    }
    return false;
}
exports.default = any;
