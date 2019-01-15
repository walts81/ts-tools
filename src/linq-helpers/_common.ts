/* tslint:disable:max-classes-per-file */
export class LinqException {
  constructor(public readonly name: string, public readonly message: string) {}
}

export class NoMatchException extends LinqException {
  constructor() {
    super('NoMatchException', 'No match found');
  }
}

export class EmptyArrayException extends LinqException {
  constructor() {
    super('EmptyArrayException', 'The array is empty');
  }
}

export class MultipleMatchException extends LinqException {
  constructor() {
    super('MultipleMatchException', 'Multiple matches found');
  }
}

export type Comparer = (a: any, b: any) => number;
export const DefaultComparer: Comparer = (a: any, b: any) => (a > b ? 1 : a === b ? 0 : -1);
