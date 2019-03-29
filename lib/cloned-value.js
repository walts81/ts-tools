"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log_level_1 = require("./logging/log-level");
var clone_value_1 = require("./clone-value");
var equivalent_objects_1 = require("./equivalent-objects");
var ClonedValue = /** @class */ (function () {
    function ClonedValue(name, getOriginalValueFn, defaultValue, onCloned, logger) {
        if (defaultValue === void 0) { defaultValue = {}; }
        if (onCloned === void 0) { onCloned = function () { }; }
        this.name = name;
        this.getOriginalValueFn = getOriginalValueFn;
        this.defaultValue = defaultValue;
        this.onCloned = onCloned;
        this.logger = logger;
    }
    Object.defineProperty(ClonedValue.prototype, "value", {
        get: function () {
            if (this._clonedValue) {
                return this._clonedValue;
            }
            var orig = this.originalValue;
            if (orig != null) {
                this.updateValue(orig, false);
            }
            return (this._clonedValue || this.defaultValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClonedValue.prototype, "originalValue", {
        get: function () {
            if (!this._orig) {
                this._orig = clone_value_1.cloneValue(this.getOriginalValueFn());
                this.logAtLevel(log_level_1.LogLevel.Info, this.name + ": updated original value");
            }
            return clone_value_1.cloneValue(this._orig);
        },
        enumerable: true,
        configurable: true
    });
    ClonedValue.prototype.revert = function () {
        this.updateValue(this.originalValue, false);
    };
    ClonedValue.prototype.update = function (val) {
        this.updateValue(val, true);
    };
    ClonedValue.prototype.hasChanged = function () {
        var a = clone_value_1.cloneValue(this._orig);
        var b = clone_value_1.cloneValue(this._clonedValue);
        var areSame = equivalent_objects_1.areObjectsEquivalent(a, b);
        return !areSame;
    };
    ClonedValue.prototype.logDiff = function (level) {
        if (level === void 0) { level = log_level_1.LogLevel.Info; }
        if (this.hasChanged()) {
            this.logAtLevel(level, this.name + ": Has differences");
            this.logAtLevel(level, this.name + " - Original:");
            this.logAtLevel(level, clone_value_1.cloneValue(this._orig));
            this.logAtLevel(level, "  " + this.name + " - Cloned:");
            this.logAtLevel(level, clone_value_1.cloneValue(this._clonedValue));
        }
        else {
            this.logAtLevel(level, this.name + ": No differences");
        }
    };
    ClonedValue.prototype.logAtLevel = function (level, message) {
        var logger = this.logger;
        if (!!logger && !!logger.logAtLevel) {
            logger.logAtLevel(level, message);
        }
    };
    ClonedValue.prototype.updateValue = function (val, isExternalUpdate) {
        this._orig = val;
        var clone = clone_value_1.cloneValue(val);
        if (!!clone) {
            this.onCloned(clone);
        }
        this._clonedValue = clone;
        if (isExternalUpdate) {
            this.logAtLevel(log_level_1.LogLevel.Info, this.name + ": updated externally");
        }
        this.logDiff();
    };
    return ClonedValue;
}());
exports.ClonedValue = ClonedValue;
