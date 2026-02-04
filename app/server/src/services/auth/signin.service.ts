import { ServiceError } from "../../errors/ServiceError.js";
import { prisma } from "../../utils/prisma.js";
import type { User } from "../../utils/prisma.types.js";
import argon2 from "argon2";
import { assertNotLocked, recordTryCount, clearTryCount } from "../../utils/rate_limit.js";
import { MAX_SIGNIN_FAIL_COUNT, SIGNIN_BLOCK_MINUTES } from "../../constants/env.const.js";

export type SignInInput = {
  username: string;
  password: string;
};

export type SignInResult = {
  user: User;
};

export const signInService = async (input: SignInInput): Promise<SignInResult> => {
  const { username, password } = input;

  if (!username || !password) {
    throw new ServiceError('BAD_REQUEST', 'ユーザ名とパスワードは必須です');
  }

  // 呼び出し上限チェック
  await assertNotLocked(
    'auth:signin',
    username,
    SIGNIN_BLOCK_MINUTES,
  );
  const execRecordTryCount = async () => {
    await recordTryCount(
      'auth:signin',
      username,
      SIGNIN_BLOCK_MINUTES,
      MAX_SIGNIN_FAIL_COUNT,
    );
  };

  // ユーザの取得
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    await execRecordTryCount();
    throw new ServiceError('UNAUTHORIZED', '存在しないユーザ名です');
  }

  // パスワードの検証
  const isPasswordValid = await argon2.verify(user.passwordHash, password);
  if (!isPasswordValid) {
    await execRecordTryCount();
    throw new ServiceError('UNAUTHORIZED', 'パスワードが正しくありません');
  }

  // 最終ログイン時刻の更新
  const currentDate = new Date();
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLoginAt: currentDate,
      lastActiveAt: currentDate,
    },
  });

  // 呼び出し上限のリセット
  await clearTryCount('auth:signin', username);

  return { user: updated };
};
