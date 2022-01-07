declare global {
  interface NumberConstructor {
    round: (val: number, decimals?: number) => number;
  }
}

Number.round = round;

export function round(val: number, decimals = 0): number {
  const valToUse = val;
  const placesToUse = decimals;
  const numToRound = Number(valToUse + 'e+' + placesToUse);
  return +(Math.round(numToRound) + 'e-' + placesToUse);
}
