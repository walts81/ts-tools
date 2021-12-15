"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClonedValue = void 0;
var log_level_1 = require("./logging/log-level");
var clone_value_1 = require("./clone-value");
var equivalent_objects_1 = require("./equivalent-objects");
var ClonedValue = /** @class */ (function () {
    function ClonedValue(name, getOriginalValueFn, defaultValue, onCloned, logger) {
        if (defaultValue === void 0) { defaultValue = null; }
        if (onCloned === void 0) { onCloned = function () { }; }
        this.name = name;
        this.getOriginalValueFn = getOriginalValueFn;
        this.defaultValue = defaultValue;
        this.onCloned = onCloned;
        this.logger = logger;
        this.initValue();
    }
    Object.defineProperty(ClonedValue.prototype, "value", {
        get: function () {
            if (!!this._clonedValue) {
                return this._clonedValue;
            }
            var orig = this.originalValue;
            if (orig != null) {
                this.updateValue(orig, false);
            }
            return this._clonedValue || this.defaultValue;
        },
        set: function (val) {
            this.updateValue(val, true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClonedValue.prototype, "originalValue", {
        get: function () {
            if (!this._orig) {
                this.initValue();
            }
            return (0, clone_value_1.cloneValue)(this._orig);
        },
        enumerable: false,
        configurable: true
    });
    ClonedValue.prototype.revert = function () {
        this.updateValue(this.originalValue, false);
    };
    ClonedValue.prototype.hasChanged = function () {
        var a = (0, clone_value_1.cloneValue)(this.value);
        var b = (0, clone_value_1.cloneValue)(this.originalValue);
        var areSame = (0, equivalent_objects_1.areObjectsEquivalent)(a, b);
        return !areSame;
    };
    ClonedValue.prototype.sync = function () {
        this._orig = (0, clone_value_1.cloneValue)(this._clonedValue);
    };
    ClonedValue.prototype.logDiff = function (level) {
        if (level === void 0) { level = log_level_1.LogLevel.Info; }
        if (!this.canLog())
            return;
        if (this.hasChanged()) {
            this.logAtLevel(level, "".concat(this.name, ": Has differences"));
            this.logAtLevel(level, "".concat(this.name, " - Original:"));
            this.logAtLevel(level, (0, clone_value_1.cloneValue)(this._orig));
            this.logAtLevel(level, "  ".concat(this.name, " - Cloned:"));
            this.logAtLevel(level, (0, clone_value_1.cloneValue)(this._clonedValue));
        }
        else {
            this.logAtLevel(level, "".concat(this.name, ": No differences"));
        }
    };
    ClonedValue.prototype.initValue = function () {
        this._orig = (0, clone_value_1.cloneValue)(this.getOriginalValueFn());
        this.logAtLevel(log_level_1.LogLevel.Info, "".concat(this.name, ": updated original value"));
    };
    ClonedValue.prototype.logAtLevel = function (level, message) {
        if (this.canLog()) {
            this.logger.logAtLevel(level, message);
        }
    };
    ClonedValue.prototype.updateValue = function (val, isExternalUpdate) {
        var clone = (0, clone_value_1.cloneValue)(val);
        if (!!clone && isExternalUpdate) {
            this.onCloned(clone);
        }
        this._clonedValue = clone;
        if (isExternalUpdate) {
            this.logAtLevel(log_level_1.LogLevel.Info, "".concat(this.name, ": updated externally"));
        }
        this.logDiff();
    };
    ClonedValue.prototype.canLog = function () {
        var logger = this.logger;
        return !!logger && !!logger.logAtLevel;
    };
    return ClonedValue;
}());
exports.ClonedValue = ClonedValue;
