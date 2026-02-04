const errorCodesToStatus = {
  'BAD_REQUEST': 400,
  'UNAUTHORIZED': 401,
  'FORBIDDEN': 403,
  'NOT_FOUND': 404,
  'CONFLICT': 409,
  'VALIDATION_ERROR': 422,
  'TOO_MANY_REQUESTS': 429,
  'INTERNAL_SERVER_ERROR': 500,
} as const;

export type ServiceErrorCode = keyof typeof errorCodesToStatus;

export class ServiceError extends Error {
  readonly code: ServiceErrorCode;
  readonly status: number;

  constructor(
    code: ServiceErrorCode,
    message: string,
  ) {
    super(message);

    this.name = "ServiceError";
    this.code = code;
    this.status = errorCodesToStatus[code];
  }
};
