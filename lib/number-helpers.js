"use strict";
Number.round = (val, decimals = 0) => {
    const valToUse = val;
    const placesToUse = decimals;
    const numToRound = Number(valToUse + 'e+' + placesToUse);
    return +(Math.round(numToRound) + 'e-' + placesToUse);
};
