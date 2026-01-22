export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return typeof value === 'undefined';
};
