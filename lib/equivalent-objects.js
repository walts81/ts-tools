"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areObjectsEquivalent = function (a, b) {
    if (a == null) {
        return b == null;
    }
    else if (b == null) {
        return a == null;
    }
    if (typeof a !== 'object' && typeof b !== 'object') {
        var areEqual = a === b;
        return areEqual;
    }
    var aType = toString.call(a);
    var bType = toString.call(b);
    if (aType !== bType) {
        return false;
    }
    if (aType === '[object Date]') {
        var areEqual = a.toISOString() === b.toISOString();
        return areEqual;
    }
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    if (aProps.length === 0) {
        return true;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        var aProp = a[propName];
        var bProp = b[propName];
        if (!exports.areObjectsEquivalent(aProp, bProp)) {
            return false;
        }
    }
    return true;
};
