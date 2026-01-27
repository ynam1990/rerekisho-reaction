import { isUndefined } from "@/shared/utils/check";
import type { ErrorResponse } from "@/shared/api/type";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
  withCredentials?: boolean;
  mockErrorCode?: number | null;
};

export class ApiError extends Error {
  public status: number;
  public body: ErrorResponse;

  constructor(status: number, method: HttpMethod, path: string, body: ErrorResponse) {
    super(`API Error: ${status}`);

    this.name = 'ApiError';
    this.status = status;
    this.body = body;
    this.message = body.message || '';

    console.error(`[API Error] Status: ${status}`, {
      method,
      path,
      errorBody: body,
    });
  };
};

const BASE_URL = '/api';

export function callAPI<TResponse, TBody = unknown> (
  path: string,
  options: RequestOptions<TBody> = {},
): {
  promise: Promise<TResponse>;
  abort: () => void;
} {
  const {
    method = 'GET',
    body,
    headers,
    signal,
    withCredentials = true,
    mockErrorCode = null,
  } = options;

  // 30秒でタイムアウト
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort();
  }, 30 * 1000);
  // 上位のsignalがabortされたらタイムアウトをabortし、間接的にfetchをabortします
  signal?.addEventListener('abort', () => {
    clearTimeout(timeoutId);
    timeoutController.abort();
  });

  const requestPromise = new Promise<TResponse>(async (resolve, reject) => {
    try {
      const res = await fetch(
        `${BASE_URL}${path}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
            ...(mockErrorCode !== null ? { 'Prefer': `code=${ mockErrorCode }` } : {}),
          },
          body: !isUndefined(body) ? JSON.stringify(body) : undefined,
          signal: timeoutController.signal,
          ...(withCredentials ? { credentials: 'include' } : {}),
        }
      );
      clearTimeout(timeoutId);
      
      const contentType = res.headers.get('content-type');
      const isJson = contentType?.includes('application/json');
      const responseBody = isJson
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        throw new ApiError(
          res.status,
          method,
          path,
          responseBody
        );
      }

      resolve(responseBody as TResponse);
    } catch (error) {
      clearTimeout(timeoutId);
      reject(error);
    }
  });

  return {
    promise: requestPromise,
    abort: () => {
      timeoutController.abort();
    },
  };
};
