"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutCachedStorageItem = void 0;
var timeout_cached_item_1 = require("./timeout-cached-item");
var TimeoutCachedStorageItem = /** @class */ (function (_super) {
    __extends(TimeoutCachedStorageItem, _super);
    function TimeoutCachedStorageItem(storage, keyPrefix, key, timeout, timeoutType, storageTimeout, storageTimeoutType, getValueDelegate, canCacheValueDelegate) {
        if (canCacheValueDelegate === void 0) { canCacheValueDelegate = function () { return true; }; }
        var _this = _super.call(this, key, timeout, timeoutType, getValueDelegate, canCacheValueDelegate) || this;
        _this.storage = storage;
        _this.keyPrefix = keyPrefix;
        _this.storageTimeout = storageTimeout;
        _this.storageTimeoutType = storageTimeoutType;
        var value = _this.getValueFromStorage();
        if (!!value && _this.canCacheValueDelegate(value)) {
            _this.lastRenewed = new Date();
            _this.value = value;
        }
        return _this;
    }
    TimeoutCachedStorageItem.prototype.getValueImplementation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.getValueImplementation.call(this)];
                    case 1:
                        value = _a.sent();
                        if (this.canCacheValueDelegate(value)) {
                            this.setValueInStorage(value);
                        }
                        return [2 /*return*/, value];
                }
            });
        });
    };
    TimeoutCachedStorageItem.prototype.setValueInStorage = function (value) {
        var lastRenewed = Date.now();
        var key = this.getStorageKey();
        var obj = { lastRenewed: lastRenewed, value: value };
        this.storage.setItem(key, JSON.stringify(obj));
    };
    TimeoutCachedStorageItem.prototype.getValueFromStorage = function () {
        var key = this.getStorageKey();
        var valueString = this.storage.getItem(key);
        if (valueString) {
            var obj = JSON.parse(valueString);
            var lastRenewed = new Date(Number(obj.lastRenewed));
            if (!this.shouldRenew(lastRenewed, this.storageTimeout, this.storageTimeoutType)) {
                return obj.value;
            }
        }
        return '';
    };
    TimeoutCachedStorageItem.prototype.getStorageKey = function () {
        return "".concat(this.keyPrefix, "-").concat(this.key);
    };
    return TimeoutCachedStorageItem;
}(timeout_cached_item_1.TimeoutCachedItem));
exports.TimeoutCachedStorageItem = TimeoutCachedStorageItem;
