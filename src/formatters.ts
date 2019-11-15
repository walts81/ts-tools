import moment from 'moment';

enum PercentOperation {
  NoOp = 0,
  DivideBy100 = 1,
  MultiplyBy100 = 2,
}

const formatCurrency = (value: number | string, cents = false, locale = 'en-US', currency = 'USD') => {
  const val = !!value ? Number(value) : 0;
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  };
  return val.toLocaleString(locale, options);
};

const isDate = (value: any): boolean => {
  if (!!value) {
    return toString.call(value) === '[object Date]';
  }

  return false;
};

const isValidDate = (date: any): boolean => {
  const invalidDt = 'Invalid Date';

  if (isDate(date)) {
    return date !== invalidDt;
  }

  if (!!date && typeof date === 'string') {
    const dt = (new Date(date) as any);
    return !!dt && dt.toString() !== invalidDt;
  }

  return false;
};

const formatDate = (date: string | Date, format = 'MM/DD/YYYY') => {
  if (!date) {
    return '';
  } else if (!isValidDate(date)) {
    return '';
  }

  const dt = moment(date);
  return dt.format(format);
};

const formatPercent = (
  value: number | string,
  decimals = 2,
  operation = PercentOperation.NoOp,
  includeSymbol = false
) => {
  let val = !!value ? Number(value) : 0;
  if (operation === PercentOperation.DivideBy100) {
    val /= 100;
  } else if (operation === PercentOperation.MultiplyBy100) {
    val *= 100;
  }
  let formatted = val.toFixed(decimals).toString();
  if (includeSymbol) {
    formatted += '%';
  }
  return formatted;
};

export { PercentOperation, formatCurrency, formatPercent, formatDate, isDate, isValidDate };
