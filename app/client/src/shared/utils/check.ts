export const isUndefined = <T>(value: T | undefined): value is undefined => {
  return typeof value === 'undefined';
};

export const hasMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object'
    && error !== null
    && 'message' in error
    && typeof (error as any).message === 'string'
  );
};
