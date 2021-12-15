"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCodeHelper = exports.ESC_KEY = exports.ENTER_KEY = void 0;
var ENTER_KEY = 13;
exports.ENTER_KEY = ENTER_KEY;
var ESC_KEY = 27;
exports.ESC_KEY = ESC_KEY;
var KeyCodeHelper = /** @class */ (function () {
    function KeyCodeHelper() {
    }
    KeyCodeHelper.isEnterKey = function ($event) {
        return KeyCodeHelper.isKeyCode($event, ENTER_KEY);
    };
    KeyCodeHelper.isEscKey = function ($event) {
        return KeyCodeHelper.isKeyCode($event, ESC_KEY);
    };
    KeyCodeHelper.isKeyCode = function ($event, code) {
        var keyCode = KeyCodeHelper.getKeyCode($event);
        return keyCode === code;
    };
    KeyCodeHelper.getKeyCode = function ($event) {
        var keyCode = $event.which;
        if (!keyCode && keyCode !== 0) {
            keyCode = $event.keyCode;
            if (!keyCode && keyCode !== 0) {
                keyCode = $event.charCode;
            }
        }
        return keyCode;
    };
    return KeyCodeHelper;
}());
exports.KeyCodeHelper = KeyCodeHelper;
