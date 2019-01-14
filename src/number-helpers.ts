interface NumberConstructor {
  round: (val: number, decimals?: number) => number;
}

Number.round = (val: number, decimals: number = 0): number => {
  let valToUse: any = val;
  let placesToUse: any = decimals;
  let numToRound = Number(valToUse + 'e+' + placesToUse);
  return +(Math.round(numToRound) + 'e-' + placesToUse);
};
