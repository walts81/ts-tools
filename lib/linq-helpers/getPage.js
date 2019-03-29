"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getPageCount_1 = __importDefault(require("./getPageCount"));
Array.prototype.getPage = function (page, pageSize) {
    return getPage(this, page, pageSize);
};
function getPage(collection, page, pageSize) {
    var pageSizeToUse = Math.min(pageSize, collection.length);
    var maxPage = getPageCount_1.default(collection.length, pageSizeToUse);
    if (page > maxPage) {
        page = maxPage;
    }
    else if (page <= 0) {
        page = 1;
    }
    var index = page - 1;
    return collection.slice(index * pageSizeToUse, page * pageSizeToUse);
}
exports.default = getPage;
