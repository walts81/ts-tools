"use strict";
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
exports.CacheStorageService = void 0;
var defaultExpiresInMinutes = 480;
var CacheStorageService = /** @class */ (function () {
    function CacheStorageService(storage, getUsernameFn) {
        this.storage = storage;
        this.getUsernameFn = getUsernameFn;
    }
    CacheStorageService.prototype.getFromCache = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var username, keyToUse, item, cacheItem, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = this.getUsername();
                        keyToUse = "".concat(key).concat(username);
                        item = this.storage.getItem(keyToUse);
                        if (!item) {
                            item = this.storage.getItem(key);
                            if (!item)
                                return [2 /*return*/, null];
                        }
                        cacheItem = JSON.parse(item);
                        if (this.isCacheExpired(cacheItem))
                            return [2 /*return*/, null];
                        if (!cacheItem.encrypted) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.decryptData(cacheItem.data)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = cacheItem.data;
                        _b.label = 3;
                    case 3: return [2 /*return*/, _a];
                }
            });
        });
    };
    CacheStorageService.prototype.setInCache = function (key, value, currentUserOnly, encrypt, minutesUntilExpire) {
        if (currentUserOnly === void 0) { currentUserOnly = false; }
        if (encrypt === void 0) { encrypt = false; }
        if (minutesUntilExpire === void 0) { minutesUntilExpire = defaultExpiresInMinutes; }
        return __awaiter(this, void 0, void 0, function () {
            var expiresOnDt, expiresOn, username, keyToUse, data, _a, cacheItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expiresOnDt = new Date();
                        expiresOnDt.setMinutes(expiresOnDt.getMinutes() + minutesUntilExpire);
                        expiresOn = expiresOnDt.toISOString();
                        username = currentUserOnly ? this.getUsername() : '';
                        keyToUse = "".concat(key).concat(username);
                        if (!encrypt) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.encryptData(value)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = value;
                        _b.label = 3;
                    case 3:
                        data = _a;
                        cacheItem = {
                            expiresOn: expiresOn,
                            encrypted: encrypt,
                            data: data,
                        };
                        this.storage.setItem(keyToUse, JSON.stringify(cacheItem));
                        return [2 /*return*/];
                }
            });
        });
    };
    CacheStorageService.prototype.clear = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.removeItem(key);
            var username = _this.getUsername();
            var userKey = "".concat(key).concat(username);
            _this.storage.removeItem(userKey);
            resolve();
        });
    };
    CacheStorageService.prototype.isCacheExpired = function (cache) {
        var now = new Date();
        var expiresOn = new Date(cache.expiresOn);
        return now > expiresOn;
    };
    CacheStorageService.prototype.encryptData = function (data) {
        return new Promise(function (resolve) {
            var result = btoa(JSON.stringify(data));
            resolve(result);
        });
    };
    CacheStorageService.prototype.decryptData = function (data) {
        return new Promise(function (resolve) {
            var result = JSON.parse(atob(data));
            resolve(result);
        });
    };
    CacheStorageService.prototype.getUsername = function () {
        return !!this.getUsernameFn ? this.getUsernameFn() || '' : '';
    };
    return CacheStorageService;
}());
exports.CacheStorageService = CacheStorageService;
