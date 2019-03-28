"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EditableValue = /** @class */ (function () {
    // expression is a delegate for setting external value
    function EditableValue(expression) {
        this.expression = expression;
    }
    EditableValue.prototype.initValue = function (val, isDefault) {
        if (isDefault === void 0) { isDefault = false; }
        this.value = val == null ? '' : val.toString().trim();
        if (this.value && isDefault) {
            this.defaultValue = this.value;
        }
        this.valueTemp = this.value;
        this.expression(this);
    };
    EditableValue.prototype.getValue = function (defaultValue) {
        if (this.isEmpty()) {
            return defaultValue || this.defaultValue || '';
        }
        return ('' + this.value).trim();
    };
    EditableValue.prototype.sync = function () {
        this.initValue(this.value);
    };
    EditableValue.prototype.hasValueChanged = function () {
        return this.value !== this.valueTemp;
    };
    EditableValue.prototype.revertValue = function () {
        this.value = this.valueTemp;
        this.expression(this);
    };
    EditableValue.prototype.isEmpty = function () {
        return String.isNullOrWhitespace(this.value) || (typeof this.value !== 'string' && typeof this.value !== 'number');
    };
    EditableValue.prototype.getValueAsNumber = function () {
        if (this.isEmpty()) {
            return 0;
        }
        return Number(this.getValue());
    };
    return EditableValue;
}());
exports.EditableValue = EditableValue;
