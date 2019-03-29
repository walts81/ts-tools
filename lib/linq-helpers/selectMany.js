"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.selectMany = function (expression) {
    return selectMany(this, expression);
};
function selectMany(collection, expression) {
    return collection.reduce(function (a, b) { return a.concat(expression(b)); }, []);
}
exports.default = selectMany;
