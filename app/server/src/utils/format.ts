export const formatSuccessResponse = (message: string, code?: number) => {
  return {
    code: code || 200,
    message,
    ok: true,
  };
};

export const formatErrorResponse = (message: string, code?: number) => {
  return {
    code: code || 400,
    message,
    ok: false,
  };
};
