"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockStorage = void 0;
var MockStorage = /** @class */ (function () {
    function MockStorage() {
        this.map = {};
    }
    MockStorage.prototype.getItem = function (key) {
        return this.map[key];
    };
    MockStorage.prototype.setItem = function (key, value) {
        this.map[key] = value;
    };
    MockStorage.prototype.clear = function () {
        this.map = {};
    };
    MockStorage.prototype.removeItem = function (key) {
        delete this.map[key];
    };
    MockStorage.prototype.getKeys = function () {
        return Object.keys(this.map);
    };
    return MockStorage;
}());
exports.MockStorage = MockStorage;
