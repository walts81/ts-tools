"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatters_1 = require("./formatters");
exports.cloneValue = function (val) {
    if (formatters_1.isDate(val) && formatters_1.isValidDate(val)) {
        return new Date(val.toISOString());
    }
    var clone = val === 0 ? 0 : val === false ? false : !!val ? JSON.parse(JSON.stringify(val)) : null;
    if (clone) {
        delete clone['__ob__']; // Vue.js-created observer property
        if (typeof clone !== 'string') {
            var props = Object.getOwnPropertyNames(clone);
            for (var i = 0; i < props.length; i++) {
                var propName = props[i];
                var prop = clone[propName];
                clone[propName] = exports.cloneValue(prop);
            }
        }
    }
    return clone;
};
