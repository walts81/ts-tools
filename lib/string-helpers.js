"use strict";
String.isNullOrEmpty = function (val) {
    if (val === undefined || val === null) {
        return true;
    }
    if (typeof val !== 'string') {
        return false;
    }
    return val === '';
};
String.isNullOrWhitespace = function (val) {
    if (String.isNullOrEmpty(val)) {
        return true;
    }
    if (typeof val !== 'string') {
        return false;
    }
    return val.trim() === '';
};
