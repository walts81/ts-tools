interface NumberConstructor {
  round: (val: number, decimals?: number) => number;
}

Number.round = (val: number, decimals: number = 0): number => {
  const valToUse: any = val;
  const placesToUse: any = decimals;
  const numToRound = Number(valToUse + 'e+' + placesToUse);
  return +(Math.round(numToRound) + 'e-' + placesToUse);
};
