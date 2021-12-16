"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.reverse = function () {
    return reverse(this);
};
function reverse(collection) {
    const results = [];
    for (let i = collection.length - 1; i >= 0; i--) {
        results.push(collection[i]);
    }
    return results;
}
exports.default = reverse;
