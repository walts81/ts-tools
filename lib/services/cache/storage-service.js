"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
class StorageService {
    constructor(innerStorage) {
        this.innerStorage = innerStorage;
    }
    getItem(key) {
        const value = this.innerStorage.getItem(key);
        const result = !!value ? JSON.parse(value) : value;
        return result;
    }
    setItem(key, value) {
        const valueToStore = JSON.stringify(value);
        this.innerStorage.setItem(key, valueToStore);
    }
    clear() {
        this.innerStorage.clear();
    }
    removeItem(key) {
        this.innerStorage.removeItem(key);
    }
}
exports.StorageService = StorageService;
