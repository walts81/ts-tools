"use strict";
Array.prototype.clone = function () {
    return [].concat(this);
};
