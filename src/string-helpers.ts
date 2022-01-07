declare global {
  interface StringConstructor {
    isNullOrEmpty: (val: string | null | undefined) => boolean;
    isNullOrWhitespace: (val: string | null | undefined) => boolean;
  }
  interface String {
    /**
     *
     * @param this The string to trim
     * @param char The character to remove from the end of the string (defaults to whitespace char)
     * @returns The trimmed string
     */
    trimEndChars: (this: string, char?: string) => string;
    /**
     *
     * @param this The string to trim
     * @param char The character to remove from the beginning of the string (defaults to whitespace char)
     * @returns The trimmed string
     */
    trimStartChars: (this: string, char?: string) => string;
    /**
     *
     * @param this The string to trim
     * @param char The character to remove from the beginning and end of the string (defaults to whitespace char)
     * @returns The trimmed string
     */
    trimChars: (this: string, char?: string) => string;
  }
}

String.isNullOrEmpty = isNullOrEmpty;
String.isNullOrWhitespace = isNullOrWhitespace;
String.prototype.trimEndChars = trimEndChars;
String.prototype.trimStartChars = trimStartChars;
String.prototype.trimChars = trimChars;

export function isNullOrEmpty(val: string | null | undefined): boolean {
  if (val === undefined || val === null) return true;

  if (typeof val !== 'string') return false;

  return val === '';
}

export function isNullOrWhitespace(val: string | null | undefined): boolean {
  if (String.isNullOrEmpty(val)) return true;

  if (typeof val !== 'string') return false;

  return val.trim() === '';
}

export function trimEndChars(this: string, char = ' ') {
  let val = this;
  while (val.charAt(val.length - 1) === char) {
    val = val.substring(0, val.length - 1);
  }
  return val;
}

export function trimStartChars(this: string, char = ' ') {
  let val = this;
  while (val.charAt(0) === char) {
    val = val.substring(1);
  }
  return val;
}

export function trimChars(this: string, char = ' ') {
  let val = this.trimStartChars(char);
  val = val.trimEndChars(char);
  return val;
}
