"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
Array.prototype.single = function (expression) {
    return single(this, expression);
};
function single(collection, expression) {
    if (collection.length === 0) {
        throw new _common_1.EmptyArrayException();
    }
    const exp = expression || (x => true);
    let result = null;
    for (const x of collection) {
        if (exp(x) === true) {
            if (result == null) {
                result = x;
            }
            else {
                throw new _common_1.MultipleMatchException();
            }
        }
    }
    if (result == null) {
        throw new _common_1.NoMatchException();
    }
    return result;
}
exports.default = single;
