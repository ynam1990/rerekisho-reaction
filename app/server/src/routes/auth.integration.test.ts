import { afterAll, afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import { prisma } from '../utils/prisma.js';
import { redis } from '../utils/redis.js';
import { createApp } from '../app.js';
import { sessionStore } from '../middlewares/session.js';

jest.setTimeout(30000);

describe('/api/auth', () => {
  const TEST_USER_NAME = 'testuser_for_auth_integration';
  const TEST_USER_PASSWORD = 'password123';

  beforeEach(async () => {
    await prisma.user.deleteMany({
      where: {
        username: TEST_USER_NAME,
      },
    });
  });
  afterEach(async () => {
    // テストユーザーを削除し、セッションも削除します
    const existingUser = await prisma.user.findUnique({
      where: {
        username: TEST_USER_NAME,
      },
    });
    if (existingUser) {
      await prisma.user.delete({
        where: {
          id: existingUser.id,
        },
      });
    }
  });

  describe('GET /me', () => {
    it('サインインしていない状態でユーザー情報を要求した場合、サインインしていないことを返す', async () => {
      const app = createApp();
      const agent = request.agent(app);

      const response = await agent.get('/api/auth/me').expect(401);

      expect(response.body.ok).toBe(false);
    });

    it('ユーザー登録を行った後に返されるサインイン済みセッションにより、ユーザー情報を返す', async () => {
      const app = createApp();
      const agent = request.agent(app);
      
      await agent.post('/api/auth/signup').send({
        username: TEST_USER_NAME,
        password: TEST_USER_PASSWORD,
        agreement: true,
      }).expect(200);
  
      const response = await agent.get('/api/auth/me').expect(200);
  
      expect(response.body.ok).toBe(true);
      expect(response.body.username).toBe(TEST_USER_NAME);
      expect(typeof response.body.clientPrefsKey).toBe('string');
      expect(response.body.clientPrefsKey.length).toBeGreaterThan(0);
    });
  });
});

afterAll(async () => {
  await Promise.all([
    prisma.$disconnect(),
    redis.quit(),
    sessionStore.close(),
  ]);
});
