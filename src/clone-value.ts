import { isDate, isValidDate } from './formatters';

export const cloneValue = <T>(val: T): T => {
  if (isDate(val) && isValidDate(val)) {
    return new Date(((val as any) as Date).toISOString()) as any;
  }

  const clone =
    (val as any) === 0 ? 0 : (val as any) === false ? false : !!val ? JSON.parse(JSON.stringify(val)) : null;
  if (clone) {
    delete clone['__ob__']; // Vue.js-created observer property
    if (typeof clone !== 'string') {
      const props = Object.getOwnPropertyNames(clone);
      for (let i = 0; i < props.length; i++) {
        const propName = props[i];
        const prop = clone[propName];
        clone[propName] = cloneValue(prop);
      }
    }
  }
  return clone;
};
