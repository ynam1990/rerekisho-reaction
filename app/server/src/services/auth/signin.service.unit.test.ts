import { describe, it, expect, beforeEach, afterEach, afterAll, jest } from '@jest/globals';
import { prisma } from '../../utils/prisma.js';
import { redis } from '../../utils/redis.js';
import type { User } from "../../utils/prisma.types.js";
import { signInService } from './signin.service.js';
import argon2 from 'argon2';

jest.setTimeout(30000);

describe('signInService', () => {
  const TEST_USER_NAME = 'testuser';
  const TEST_USER_PASSWORD = 'password123';
  let testUser: User;

  // 毎回テストユーザーを再作成します
  beforeEach(async () => {
    await prisma.user.deleteMany({
      where: {
        username: {
          contains: TEST_USER_NAME,
        },
      },
    });
    testUser = await prisma.user.create({
      data: {
        username: TEST_USER_NAME,
        email: null,
        passwordHash: await argon2.hash(TEST_USER_PASSWORD),
        sessionVersion: 1,
        lastLoginAt: new Date('2025-01-01T00:00:00.000Z'),
        lastActiveAt: new Date('2025-01-01T00:00:00.000Z'),
      },
    });
  });
  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        username: {
          contains: TEST_USER_NAME,
        },
      },
    });
  });

  it('usernameまたはpasswordが空ならBAD_REQUESTを投げる', async () => {
    // usernameが空
    await expect(
      signInService({
        username: '',
        password: TEST_USER_PASSWORD
      })
    ).rejects.toMatchObject({
      name: 'ServiceError',
      code: 'BAD_REQUEST',
    });

    // passwordが空
    await expect(
      signInService({
        username: TEST_USER_NAME,
        password: ''
      })
    ).rejects.toMatchObject({
      name: 'ServiceError',
      code: 'BAD_REQUEST',
    });
  });

  it('存在しないユーザーならUNAUTHORIZEDを投げる', async () => {
    await expect(
      signInService({
        username: `${ TEST_USER_NAME }_not_exists`,
        password: TEST_USER_PASSWORD,
      }),
    ).rejects.toMatchObject({
      name: 'ServiceError',
      code: 'UNAUTHORIZED',
    });
  });

  it('パスワードが誤っていればUNAUTHORIZEDを投げる', async () => {
    await expect(
      signInService({
        username: TEST_USER_NAME,
        password: 'wrong_password',
      }),
    ).rejects.toMatchObject({
      name: 'ServiceError',
      code: 'UNAUTHORIZED',
    });
  });

  it('正しい認証情報ならユーザーを返し最終ログイン時刻を更新する', async () => {
    const result = await signInService({
      username: TEST_USER_NAME,
      password: TEST_USER_PASSWORD,
    });

    expect(result.user.username).toBe(TEST_USER_NAME);
    expect(result.user.lastLoginAt.getTime()).toBeGreaterThan(testUser.lastLoginAt.getTime());
    expect(result.user.lastActiveAt.getTime()).toBeGreaterThan(testUser.lastActiveAt.getTime());
  });

  it('ロック中なら TOO_MANY_REQUESTS を投げる', async () => {
    const username = `${ TEST_USER_NAME }_locked`;
    await redis.set(`auth:signin:lock:${ username }`, '1', 'EX', 30);

    await expect(
      signInService({
        username,
        password: TEST_USER_PASSWORD,
      }),
    ).rejects.toMatchObject({
      name: 'ServiceError',
      code: 'TOO_MANY_REQUESTS',
    });
  });
});

afterAll(async () => {
  await redis.flushall();
  await Promise.all([
    prisma.$disconnect(),
    redis.quit(),
  ]);
});
