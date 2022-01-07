import moment from 'moment';
import * as DateHelpers from './date-helpers';

export enum PercentOperation {
  NoOp = 0,
  DivideBy100 = 1,
  MultiplyBy100 = 2,
}

export const formatCurrency = (value: number | string, cents = false, locale = 'en-US', currency = 'USD') => {
  const val = !!value ? Number(value) : 0;
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  };
  return val.toLocaleString(locale, options);
};

export const formatDate = (date: string | Date, format = 'MM/DD/YYYY') => {
  if (!date) return '';

  if (!DateHelpers.isValidDate(date)) return '';

  return moment(date).format(format);
};

export const formatPercent = (
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
