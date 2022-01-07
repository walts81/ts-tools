const padding = (value: any): string => {
  return '00000000000000000000'.slice(0, value.length);
};

const safeString = (value: any): string => {
  if (value == null) {
    return '';
  }
  return ('' + value).trim();
};

const regexReplacer = ($0: any, integer: any, decimal: any, $3: any) => {
  if (decimal !== $3) {
    return $0.replace(/(\d+)/g, ($d: any) => padding($d) + $d);
  }
  if (!decimal) {
    decimal = '.0';
  }
  for (let i = decimal.length - 1; i >= 0; i--) {
    if (decimal[i] === '0' && i - 1 >= 0 && decimal[i - 1] !== '.') {
      decimal = decimal.substring(0, decimal.length - i);
    }
  }
  return padding(integer) + integer + decimal + padding(decimal);
};

export const getNaturalValue = (value: any): string => safeString(value).replace(/(\d+)((\.\d+)+)?/g, regexReplacer);

export const naturalSort = (a: any, b: any, desc?: boolean): number => {
  a = getNaturalValue(a);
  b = getNaturalValue(b);

  const numA = Number(a);
  const numB = Number(b);
  if (!isNaN(numA) && !isNaN(numB)) {
    a = numA;
    b = numB;
  }

  if (a < b) return desc ? 1 : -1;

  if (a > b) return desc ? -1 : 1;

  return 0;
};

export const getNaturalValueFn = (field1: any, field2?: any): ((item: any) => string) => {
  return (item: any) => {
    let val = item[field1];
    if (field2) {
      val = val[field2];
    }
    return getNaturalValue(val);
  };
};
