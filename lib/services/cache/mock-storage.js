"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockStorage = void 0;
class MockStorage {
    constructor() {
        this.map = {};
    }
    getItem(key) {
        return this.map[key];
    }
    setItem(key, value) {
        this.map[key] = value;
    }
    clear() {
        this.map = {};
    }
    removeItem(key) {
        delete this.map[key];
    }
    getKeys() {
        return Object.keys(this.map);
    }
}
exports.MockStorage = MockStorage;
