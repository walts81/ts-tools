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
exports.ApiCachedResponseHelper = void 0;
const timeout_cached_storage_item_1 = require("./timeout-cached-storage-item");
class ApiCachedResponseHelper {
    constructor(storage, keyPrefix, timeout, timeoutType, storageTimeout, storageTimeoutType, http, canCacheValueDelegate = () => true) {
        this.storage = storage;
        this.keyPrefix = keyPrefix;
        this.timeout = timeout;
        this.timeoutType = timeoutType;
        this.storageTimeout = storageTimeout;
        this.storageTimeoutType = storageTimeoutType;
        this.http = http;
        this.canCacheValueDelegate = canCacheValueDelegate;
        this.values = {};
    }
    getFromUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let cached = this.values[url];
            if (!cached) {
                cached = new timeout_cached_storage_item_1.TimeoutCachedStorageItem(this.storage, this.keyPrefix, url, this.timeout, this.timeoutType, this.storageTimeout, this.storageTimeoutType, x => this.getFromApi(x), this.canCacheValueDelegate);
                this.values[url] = cached;
            }
            const json = yield cached.getValue();
            if (json) {
                return JSON.parse(json);
            }
            return null;
        });
    }
    getFromApi(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.http.get(url);
                if (response.status === 200) {
                    return JSON.stringify(response);
                }
            }
            catch (err) {
                return '';
            }
            return '';
        });
    }
}
exports.ApiCachedResponseHelper = ApiCachedResponseHelper;
