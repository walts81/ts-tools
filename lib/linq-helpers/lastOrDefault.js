"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.lastOrDefault = function (expression) {
    return lastOrDefault(this, expression);
};
function lastOrDefault(collection, expression) {
    const exp = expression || (x => true);
    for (let i = collection.length - 1; i >= 0; i--) {
        const item = collection[i];
        if (exp(item) === true) {
            return item;
        }
    }
    return null;
}
exports.default = lastOrDefault;
