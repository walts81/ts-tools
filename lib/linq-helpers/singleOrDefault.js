"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _common_1 = require("./_common");
Array.prototype.singleOrDefault = function (expression) {
    return singleOrDefault(this, expression);
};
function singleOrDefault(collection, expression) {
    if (collection.length === 0) {
        return null;
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
    return result;
}
exports.default = singleOrDefault;
