"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultComparer = exports.MultipleMatchException = exports.EmptyArrayException = exports.NoMatchException = exports.LinqException = void 0;
/* tslint:disable:max-classes-per-file */
class LinqException {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
}
exports.LinqException = LinqException;
class NoMatchException extends LinqException {
    constructor() {
        super('NoMatchException', 'No match found');
    }
}
exports.NoMatchException = NoMatchException;
class EmptyArrayException extends LinqException {
    constructor() {
        super('EmptyArrayException', 'The array is empty');
    }
}
exports.EmptyArrayException = EmptyArrayException;
class MultipleMatchException extends LinqException {
    constructor() {
        super('MultipleMatchException', 'Multiple matches found');
    }
}
exports.MultipleMatchException = MultipleMatchException;
const DefaultComparer = (a, b) => (a > b ? 1 : a === b ? 0 : -1);
exports.DefaultComparer = DefaultComparer;
