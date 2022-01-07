export const isDate = (value: any): boolean => {
  return !!value && toString.call(value) === '[object Date]';
};

export const isValidDate = (date: any): boolean => {
  const invalidDt = 'Invalid Date';

  if (isDate(date)) return date !== invalidDt;

  if (!!date && typeof date === 'string') {
    const dt = new Date(date) as any;
    return !!dt && dt.toString() !== invalidDt;
  }

  return false;
};
