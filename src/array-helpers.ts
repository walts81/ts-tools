import { cloneValue } from './clone-value';

declare global {
  interface Array<T> {
    clone(cloneItems: boolean): T[];
  }
}

Array.prototype.clone = function<T>(cloneItems: boolean): T[] {
  if (cloneItems) {
    return this.map(cloneValue);
  }
  return [...this];
};
