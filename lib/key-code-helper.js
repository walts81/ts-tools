"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCodeHelper = exports.ESC_KEY = exports.ENTER_KEY = void 0;
const ENTER_KEY = 13;
exports.ENTER_KEY = ENTER_KEY;
const ESC_KEY = 27;
exports.ESC_KEY = ESC_KEY;
class KeyCodeHelper {
    static isEnterKey($event) {
        return KeyCodeHelper.isKeyCode($event, ENTER_KEY);
    }
    static isEscKey($event) {
        return KeyCodeHelper.isKeyCode($event, ESC_KEY);
    }
    static isKeyCode($event, code) {
        const keyCode = KeyCodeHelper.getKeyCode($event);
        return keyCode === code;
    }
    static getKeyCode($event) {
        let keyCode = $event.which;
        if (!keyCode && keyCode !== 0) {
            keyCode = $event.keyCode;
            if (!keyCode && keyCode !== 0) {
                keyCode = $event.charCode;
            }
        }
        return keyCode;
    }
}
exports.KeyCodeHelper = KeyCodeHelper;
