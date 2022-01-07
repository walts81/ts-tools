export const cloneValue = <T>(val: T): T => {
  if (val === null) return null as any;

  if (val === undefined) return undefined as any;

  return JSON.parse(JSON.stringify(val)) as T;
};
