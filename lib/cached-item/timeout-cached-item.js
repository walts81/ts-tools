"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var TimeoutType;
(function (TimeoutType) {
    TimeoutType[TimeoutType["InSeconds"] = 1] = "InSeconds";
    TimeoutType[TimeoutType["InMinutes"] = 2] = "InMinutes";
    TimeoutType[TimeoutType["InHours"] = 3] = "InHours";
    TimeoutType[TimeoutType["InDays"] = 4] = "InDays";
})(TimeoutType || (TimeoutType = {}));
exports.TimeoutType = TimeoutType;
var MILLISECONDS_IN_SECOND = 1000;
exports.MILLISECONDS_IN_SECOND = MILLISECONDS_IN_SECOND;
var SECONDS_IN_MINUTE = 60;
var MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
exports.MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_MINUTE;
var MINUTES_IN_HOUR = 60;
var MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;
exports.MILLISECONDS_IN_HOUR = MILLISECONDS_IN_HOUR;
var HOURS_IN_DAY = 24;
var MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;
exports.MILLISECONDS_IN_DAY = MILLISECONDS_IN_DAY;
var TimeoutCachedItem = /** @class */ (function () {
    function TimeoutCachedItem(key, timeout, timeoutType, getValueDelegate) {
        this.key = key;
        this.timeout = timeout;
        this.timeoutType = timeoutType;
        this.getValueDelegate = getValueDelegate;
        var now = new Date();
        this.lastRenewed = this.getDateOffset(now, this.timeout, this.timeoutType, false);
    }
    TimeoutCachedItem.prototype.getValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.shouldRenew(this.lastRenewed, this.timeout, this.timeoutType)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getValueImplementation()];
                    case 1:
                        _a.value = _b.sent();
                        this.lastRenewed = new Date();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.value];
                }
            });
        });
    };
    TimeoutCachedItem.prototype.getValueImplementation = function () {
        return this.getValueDelegate(this.key);
    };
    TimeoutCachedItem.prototype.shouldRenew = function (lastRenewed, timeout, timeoutType) {
        var offset = this.getDateOffset(lastRenewed, timeout, timeoutType, true);
        var now = new Date();
        return offset <= now;
    };
    TimeoutCachedItem.prototype.getDateOffset = function (fromDate, timeout, timeoutType, offsetAfter) {
        var milliseconds = 0;
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
        var offset = offsetAfter ? fromDate.getTime() + milliseconds : fromDate.getTime() - milliseconds;
        return new Date(offset);
    };
    return TimeoutCachedItem;
}());
exports.TimeoutCachedItem = TimeoutCachedItem;
