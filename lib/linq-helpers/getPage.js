"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPageCount_1 = __importDefault(require("./getPageCount"));
Array.prototype.getPage = function (page, pageSize) {
    return getPage(this, page, pageSize);
};
function getPage(collection, page, pageSize) {
    const pageSizeToUse = Math.min(pageSize, collection.length);
    const maxPage = (0, getPageCount_1.default)(collection.length, pageSizeToUse);
    if (page > maxPage) {
        page = maxPage;
    }
    else if (page <= 0) {
        page = 1;
    }
    const index = page - 1;
    return collection.slice(index * pageSizeToUse, page * pageSizeToUse);
}
exports.default = getPage;
