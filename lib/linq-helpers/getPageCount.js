"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.getPageCount = function (pageSize) {
    return getPageCount(this.length, pageSize);
};
function getPageCount(total, pageSize) {
    var x = total;
    var y = pageSize;
    var totalPages = Math.floor(x / y);
    if (x % y > 0) {
        totalPages++;
    }
    return totalPages || 1;
}
exports.default = getPageCount;
