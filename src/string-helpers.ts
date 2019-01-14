interface StringConstructor {
  isNullOrEmpty: (val: string | null | undefined) => boolean;
  isNullOrWhitespace: (val: string | null | undefined) => boolean;
}

String.isNullOrEmpty = (val: string | null | undefined): boolean => {
  if (val === undefined || val === null) {
    return true;
  }

  if (typeof val !== 'string') {
    return false;
  }

  return val === '';
};

String.isNullOrWhitespace = (val: string | null | undefined): boolean => {
  if (String.isNullOrEmpty(val)) {
    return true;
  }

  if (typeof val !== 'string') {
    return false;
  }

  return val.trim() === '';
};
