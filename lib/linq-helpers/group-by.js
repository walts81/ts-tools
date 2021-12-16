"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.groupBy = function (expression) {
    return groupBy(this, expression);
};
function groupBy(collection, expression) {
    const groups = {};
    const results = [];
    for (const x of collection) {
        const key = expression(x);
        if (!groups[key]) {
            const group = { key, items: [] };
            groups[key] = group;
            results.push(group);
        }
        groups[key].items.push(x);
    }
    return results;
}
exports.default = groupBy;
