"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.selectMany = function (expression) {
    return selectMany(this, expression);
};
function selectMany(collection, expression) {
    return collection.reduce((a, b) => a.concat(expression(b)), []);
}
exports.default = selectMany;
