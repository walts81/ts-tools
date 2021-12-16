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
exports.TimeoutCachedStorageItem = void 0;
const timeout_cached_item_1 = require("./timeout-cached-item");
class TimeoutCachedStorageItem extends timeout_cached_item_1.TimeoutCachedItem {
    constructor(storage, keyPrefix, key, timeout, timeoutType, storageTimeout, storageTimeoutType, getValueDelegate, canCacheValueDelegate = () => true) {
        super(key, timeout, timeoutType, getValueDelegate, canCacheValueDelegate);
        this.storage = storage;
        this.keyPrefix = keyPrefix;
        this.storageTimeout = storageTimeout;
        this.storageTimeoutType = storageTimeoutType;
        const value = this.getValueFromStorage();
        if (!!value && this.canCacheValueDelegate(value)) {
            this.lastRenewed = new Date();
            this.value = value;
        }
    }
    getValueImplementation() {
        const _super = Object.create(null, {
            getValueImplementation: { get: () => super.getValueImplementation }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield _super.getValueImplementation.call(this);
            if (this.canCacheValueDelegate(value)) {
                this.setValueInStorage(value);
            }
            return value;
        });
    }
    setValueInStorage(value) {
        const lastRenewed = Date.now();
        const key = this.getStorageKey();
        const obj = { lastRenewed, value };
        this.storage.setItem(key, JSON.stringify(obj));
    }
    getValueFromStorage() {
        const key = this.getStorageKey();
        const valueString = this.storage.getItem(key);
        if (valueString) {
            const obj = JSON.parse(valueString);
            const lastRenewed = new Date(Number(obj.lastRenewed));
            if (!this.shouldRenew(lastRenewed, this.storageTimeout, this.storageTimeoutType)) {
                return obj.value;
            }
        }
        return '';
    }
    getStorageKey() {
        return `${this.keyPrefix}-${this.key}`;
    }
}
exports.TimeoutCachedStorageItem = TimeoutCachedStorageItem;
