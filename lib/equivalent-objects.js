"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areObjectsEquivalent = void 0;
const areObjectsEquivalent = (a, b) => {
    if (a == null) {
        return b == null;
    }
    else if (b == null) {
        return a == null;
    }
    return JSON.stringify(a) === JSON.stringify(b);
    // if (typeof a !== 'object' && typeof b !== 'object') {
    //   const areEqual = a === b;
    //   return areEqual;
    // }
    // const aType = toString.call(a);
    // const bType = toString.call(b);
    // if (aType !== bType) {
    //   return false;
    // }
    // if (aType === '[object Date]') {
    //   const areEqual = (a as Date).toISOString() === (b as Date).toISOString();
    //   return areEqual;
    // }
    // const aProps = Object.getOwnPropertyNames(a);
    // const bProps = Object.getOwnPropertyNames(b);
    // if (aProps.length !== bProps.length) {
    //   return false;
    // }
    // if (aProps.length === 0) {
    //   return true;
    // }
    // for (let i = 0; i < aProps.length; i++) {
    //   const propName = aProps[i];
    //   const aProp = a[propName];
    //   const bProp = b[propName];
    //   if (!areObjectsEquivalent(aProp, bProp)) {
    //     return false;
    //   }
    // }
    // return true;
};
exports.areObjectsEquivalent = areObjectsEquivalent;
