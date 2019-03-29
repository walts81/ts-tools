"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.groupBy = function (expression) {
    return groupBy(this, expression);
};
function groupBy(collection, expression) {
    var groups = {};
    var results = [];
    for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
        var x = collection_1[_i];
        var key = expression(x);
        if (!groups[key]) {
            var group = { key: key, items: [] };
            groups[key] = group;
            results.push(group);
        }
        groups[key].items.push(x);
    }
    return results;
}
exports.default = groupBy;
