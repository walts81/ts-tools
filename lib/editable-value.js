"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableValue = void 0;
class EditableValue {
    // expression is a delegate for setting external value
    constructor(expression) {
        this.expression = expression;
        // for binding purposes only
        this.value = '';
        // for ability to cancel an edit (revert)
        this.valueTemp = '';
    }
    initValue(val, isDefault = false) {
        this.value = val == null ? '' : val.toString().trim();
        if (this.value && isDefault) {
            this.defaultValue = this.value;
        }
        this.valueTemp = this.value;
        this.expression(this);
    }
    getValue(defaultValue) {
        if (this.isEmpty()) {
            return defaultValue || this.defaultValue || '';
        }
        return ('' + this.value).trim();
    }
    sync() {
        this.initValue(this.value);
    }
    hasValueChanged() {
        return this.value !== this.valueTemp;
    }
    revertValue() {
        this.value = this.valueTemp;
        this.expression(this);
    }
    isEmpty() {
        return String.isNullOrWhitespace(this.value) || (typeof this.value !== 'string' && typeof this.value !== 'number');
    }
    getValueAsNumber() {
        if (this.isEmpty()) {
            return 0;
        }
        return Number(this.getValue());
    }
}
exports.EditableValue = EditableValue;
