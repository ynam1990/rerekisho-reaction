import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { api } from './openapi.ts';

export const TEST_USER_AUTH_INFO = {
  username: 'testuser',
  password: 'testpassword',
} as const;
const SIGN_IN_OPERATION = api.getOperation('signin');

export const server = setupServer(
  http.all('*', async ({ request }) => {
    const url = new URL(request.url);
    const requestPath = url.pathname;
    const requestBody = await request.json().catch(() => undefined);

    // サインインは認証情報のチェックまでは自動でモックできないため、テストユーザーの認証情報でレスポンスをモックします
    if (
      request.method === SIGN_IN_OPERATION?.method?.toUpperCase() &&
      requestPath === SIGN_IN_OPERATION?.path
    ) {
      const body = requestBody as any;

      if (
        body?.username === TEST_USER_AUTH_INFO.username
        && body?.password === TEST_USER_AUTH_INFO.password
      ) {
        const { status, mock } = api.mockResponseForOperation('signin');
        return HttpResponse.json(mock, { status });
      }

      const { status, mock } = api.mockResponseForOperation('signin', { code: 401 });
      return HttpResponse.json(mock, { status });
    }

    const req = {
      method: request.method,
      path: requestPath,
      headers: Object.fromEntries(request.headers.entries()),
      query: Object.fromEntries(url.searchParams.entries()),
      body: requestBody,
    };

    const operation = api.matchOperation(req);

    if (!operation) {
      return HttpResponse.json(
        { message: 'API定義が見つかりません' },
        { status: 404 }
      );
    }

    if (!operation.operationId) {
      return HttpResponse.json(
        { message: 'operationIdが該当APIに定義されていません' },
        { status: 500 }
      );
    }

    const validation = api.validateRequest(req, operation);
    if (validation.errors) {
      return HttpResponse.json(
        { errors: validation.errors },
        { status: 400 }
      );
    }

    const { status, mock } = api.mockResponseForOperation(operation.operationId);

    return HttpResponse.json(mock, { status });
  })
);
