"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClonedValue = void 0;
const log_level_1 = require("./logging/log-level");
const clone_value_1 = require("./clone-value");
const equivalent_objects_1 = require("./equivalent-objects");
class ClonedValue {
    constructor(name, getOriginalValueFn, defaultValue = null, onCloned = () => { }, logger) {
        this.name = name;
        this.getOriginalValueFn = getOriginalValueFn;
        this.defaultValue = defaultValue;
        this.onCloned = onCloned;
        this.logger = logger;
        this.initValue();
    }
    get value() {
        if (!!this._clonedValue) {
            return this._clonedValue;
        }
        const orig = this.originalValue;
        if (orig != null) {
            this.updateValue(orig, false);
        }
        return this._clonedValue || this.defaultValue;
    }
    set value(val) {
        this.updateValue(val, true);
    }
    get originalValue() {
        if (!this._orig) {
            this.initValue();
        }
        return (0, clone_value_1.cloneValue)(this._orig);
    }
    revert() {
        this.updateValue(this.originalValue, false);
    }
    hasChanged() {
        const a = (0, clone_value_1.cloneValue)(this.value);
        const b = (0, clone_value_1.cloneValue)(this.originalValue);
        const areSame = (0, equivalent_objects_1.areObjectsEquivalent)(a, b);
        return !areSame;
    }
    sync() {
        this._orig = (0, clone_value_1.cloneValue)(this._clonedValue);
    }
    logDiff(level = log_level_1.LogLevel.Info) {
        if (!this.canLog())
            return;
        if (this.hasChanged()) {
            this.logAtLevel(level, `${this.name}: Has differences`);
            this.logAtLevel(level, `${this.name} - Original:`);
            this.logAtLevel(level, (0, clone_value_1.cloneValue)(this._orig));
            this.logAtLevel(level, `  ${this.name} - Cloned:`);
            this.logAtLevel(level, (0, clone_value_1.cloneValue)(this._clonedValue));
        }
        else {
            this.logAtLevel(level, `${this.name}: No differences`);
        }
    }
    initValue() {
        this._orig = (0, clone_value_1.cloneValue)(this.getOriginalValueFn());
        this.logAtLevel(log_level_1.LogLevel.Info, `${this.name}: updated original value`);
    }
    logAtLevel(level, message) {
        if (this.canLog()) {
            this.logger.logAtLevel(level, message);
        }
    }
    updateValue(val, isExternalUpdate) {
        const clone = (0, clone_value_1.cloneValue)(val);
        if (!!clone && isExternalUpdate) {
            this.onCloned(clone);
        }
        this._clonedValue = clone;
        if (isExternalUpdate) {
            this.logAtLevel(log_level_1.LogLevel.Info, `${this.name}: updated externally`);
        }
        this.logDiff();
    }
    canLog() {
        const logger = this.logger;
        return !!logger && !!logger.logAtLevel;
    }
}
exports.ClonedValue = ClonedValue;
