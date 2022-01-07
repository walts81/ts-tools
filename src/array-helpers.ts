import { cloneValue } from './clone-value';

declare global {
  interface Array<T> {
    /**
     *
     * @param this The array to clone
     * @param shallow True to return a shallow copy of the array.
     * False to return deep copies of all items in the array.
     * Defaults to false
     */
    clone(this: T[], shallow?: boolean): T[];
  }
}

Array.prototype.clone = clone;

export function clone<T>(this: T[], shallow = false): T[] {
  if (shallow) return [...this];

  return this.map(cloneValue);
}
