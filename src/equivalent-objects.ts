export const areObjectsEquivalent = (a: any, b: any): boolean => {
  if (a == null) return b == null;

  if (b == null) return a == null;

  return JSON.stringify(a) === JSON.stringify(b);
};
