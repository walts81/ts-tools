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
exports.TimeoutCachedItem = exports.MILLISECONDS_IN_DAY = exports.MILLISECONDS_IN_HOUR = exports.MILLISECONDS_IN_MINUTE = exports.MILLISECONDS_IN_SECOND = exports.TimeoutType = void 0;
var TimeoutType;
(function (TimeoutType) {
    TimeoutType[TimeoutType["InSeconds"] = 1] = "InSeconds";
    TimeoutType[TimeoutType["InMinutes"] = 2] = "InMinutes";
    TimeoutType[TimeoutType["InHours"] = 3] = "InHours";
    TimeoutType[TimeoutType["InDays"] = 4] = "InDays";
})(TimeoutType || (TimeoutType = {}));
exports.TimeoutType = TimeoutType;
const MILLISECONDS_IN_SECOND = 1000;
exports.MILLISECONDS_IN_SECOND = MILLISECONDS_IN_SECOND;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
exports.MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_MINUTE;
const MINUTES_IN_HOUR = 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;
exports.MILLISECONDS_IN_HOUR = MILLISECONDS_IN_HOUR;
const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;
exports.MILLISECONDS_IN_DAY = MILLISECONDS_IN_DAY;
class TimeoutCachedItem {
    constructor(key, timeout, timeoutType, getValueDelegate, canCacheValueDelegate = () => true) {
        this.key = key;
        this.timeout = timeout;
        this.timeoutType = timeoutType;
        this.getValueDelegate = getValueDelegate;
        this.canCacheValueDelegate = canCacheValueDelegate;
        const now = new Date();
        this.lastRenewed = this.getDateOffset(now, this.timeout, this.timeoutType, false);
    }
    getValue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.shouldRenew(this.lastRenewed, this.timeout, this.timeoutType)) {
                const value = yield this.getValueImplementation();
                if (this.canCacheValueDelegate(value)) {
                    this.value = value;
                    this.lastRenewed = new Date();
                }
                return value;
            }
            return this.value;
        });
    }
    getValueImplementation() {
        return this.getValueDelegate(this.key);
    }
    shouldRenew(lastRenewed, timeout, timeoutType) {
        const offset = this.getDateOffset(lastRenewed, timeout, timeoutType, true);
        const now = new Date();
        return offset <= now;
    }
    getDateOffset(fromDate, timeout, timeoutType, offsetAfter) {
        let milliseconds = 0;
        if (timeoutType === TimeoutType.InSeconds) {
            milliseconds = timeout * MILLISECONDS_IN_SECOND;
        }
        else if (timeoutType === TimeoutType.InHours) {
            milliseconds = timeout * MILLISECONDS_IN_HOUR;
        }
        else if (timeoutType === TimeoutType.InDays) {
            milliseconds = timeout * MILLISECONDS_IN_DAY;
        }
        else {
            milliseconds = timeout * MILLISECONDS_IN_MINUTE;
        }
        const offset = offsetAfter ? fromDate.getTime() + milliseconds : fromDate.getTime() - milliseconds;
        return new Date(offset);
    }
}
exports.TimeoutCachedItem = TimeoutCachedItem;
