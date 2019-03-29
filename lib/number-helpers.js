"use strict";
Number.round = function (val, decimals) {
    if (decimals === void 0) { decimals = 0; }
    var valToUse = val;
    var placesToUse = decimals;
    var numToRound = Number(valToUse + 'e+' + placesToUse);
    return +(Math.round(numToRound) + 'e-' + placesToUse);
};
