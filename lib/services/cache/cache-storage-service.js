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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStorageService = void 0;
const defaultExpiresInMinutes = 480;
class CacheStorageService {
    constructor(storage, getUsernameFn) {
        this.storage = storage;
        this.getUsernameFn = getUsernameFn;
    }
    getFromCache(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = this.getUsername();
            const keyToUse = `${key}${username}`;
            let item = this.storage.getItem(keyToUse);
            if (!item) {
                item = this.storage.getItem(key);
                if (!item)
                    return null;
            }
            const cacheItem = JSON.parse(item);
            if (this.isCacheExpired(cacheItem))
                return null;
            return cacheItem.encrypted ? yield this.decryptData(cacheItem.data) : cacheItem.data;
        });
    }
    setInCache(key, value, currentUserOnly = false, encrypt = false, minutesUntilExpire = defaultExpiresInMinutes) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresOnDt = new Date();
            expiresOnDt.setMinutes(expiresOnDt.getMinutes() + minutesUntilExpire);
            const expiresOn = expiresOnDt.toISOString();
            const username = currentUserOnly ? this.getUsername() : '';
            const keyToUse = `${key}${username}`;
            const data = encrypt ? yield this.encryptData(value) : value;
            const cacheItem = {
                expiresOn,
                encrypted: encrypt,
                data,
            };
            this.storage.setItem(keyToUse, JSON.stringify(cacheItem));
        });
    }
    clear(key) {
        return new Promise((resolve) => {
            this.storage.removeItem(key);
            const username = this.getUsername();
            const userKey = `${key}${username}`;
            this.storage.removeItem(userKey);
            resolve();
        });
    }
    isCacheExpired(cache) {
        const now = new Date();
        const expiresOn = new Date(cache.expiresOn);
        return now > expiresOn;
    }
    encryptData(data) {
        return new Promise((resolve) => {
            const result = btoa(JSON.stringify(data));
            resolve(result);
        });
    }
    decryptData(data) {
        return new Promise((resolve) => {
            const result = JSON.parse(atob(data));
            resolve(result);
        });
    }
    getUsername() {
        return !!this.getUsernameFn ? this.getUsernameFn() || '' : '';
    }
}
exports.CacheStorageService = CacheStorageService;
