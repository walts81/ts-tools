"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
var StorageService = /** @class */ (function () {
    function StorageService(innerStorage) {
        this.innerStorage = innerStorage;
    }
    StorageService.prototype.getItem = function (key) {
        var value = this.innerStorage.getItem(key);
        var result = !!value ? JSON.parse(value) : value;
        return result;
    };
    StorageService.prototype.setItem = function (key, value) {
        var valueToStore = JSON.stringify(value);
        this.innerStorage.setItem(key, valueToStore);
    };
    StorageService.prototype.clear = function () {
        this.innerStorage.clear();
    };
    StorageService.prototype.removeItem = function (key) {
        this.innerStorage.removeItem(key);
    };
    return StorageService;
}());
exports.StorageService = StorageService;
