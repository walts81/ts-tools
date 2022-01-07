declare global {
  interface Math {
    /**
     * @param x The number to round
     * @param decimals The number of decimal places to round to.
     * Defaults to zero (the default implementation of Math.round)
     *
     * @returns The rounded number
     */
    roundToNearest: (x: number, decimalPlaces?: number) => number;
  }
}

Math.roundToNearest = roundToNearest;

export function roundToNearest(x: number, decimalPlaces = 0): number {
  if (decimalPlaces === 0) return Math.round(x);

  const valToUse = x;
  const placesToUse = decimalPlaces;
  const numToRound = Number(valToUse + 'e+' + placesToUse);
  return +(Math.round(numToRound) + 'e-' + placesToUse);
}
