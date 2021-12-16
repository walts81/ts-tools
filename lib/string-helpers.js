"use strict";
String.isNullOrEmpty = (val) => {
    if (val === undefined || val === null) {
        return true;
    }
    if (typeof val !== 'string') {
        return false;
    }
    return val === '';
};
String.isNullOrWhitespace = (val) => {
    if (String.isNullOrEmpty(val)) {
        return true;
    }
    if (typeof val !== 'string') {
        return false;
    }
    return val.trim() === '';
};
