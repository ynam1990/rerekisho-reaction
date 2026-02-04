import { ServiceError } from "../../errors/ServiceError.js";
import { Prisma, prisma } from "../../utils/prisma.js";
import type { User } from "../../utils/prisma.types.js";
import argon2 from "argon2";
import { assertNotLocked, recordTryCount } from "../../utils/rate_limit.js";
import { MAX_SIGNUP_FROM_SAME_IP_COUNT, SIGNUP_BLOCK_MINUTES } from "../../constants/env.const.js";

export type SignUpInput = {
  username: string;
  password: string;
  agreement: boolean;
};

export type SignUpResult = {
  user: User;
};

export const signUpService = async (input: SignUpInput, ipAddress: string): Promise<SignUpResult> => {
  const { username, password, agreement } = input;

  // 呼び出し上限チェックと記録
  // アカウント大量作成を防ぐ目的のため、成功時のリセットは行いません(redis側で自動的にexpireされるのを待ちます)
  await assertNotLocked(
    'auth:signup',
    ipAddress,
    SIGNUP_BLOCK_MINUTES,
  );
  await recordTryCount(
    'auth:signup',
    ipAddress,
    SIGNUP_BLOCK_MINUTES,
    MAX_SIGNUP_FROM_SAME_IP_COUNT,
  );

  if (!username || !password) {
    throw new ServiceError('BAD_REQUEST', 'ユーザ名とパスワードは必須です');
  }
  if (username.length < 4) {
    throw new ServiceError('VALIDATION_ERROR', 'ユーザ名は4文字以上である必要があります');
  }
  if (password.length < 8) {
    throw new ServiceError('VALIDATION_ERROR', 'パスワードは8文字以上である必要があります');
  }
  if (agreement !== true) {
    throw new ServiceError('VALIDATION_ERROR', '登録には同意が必要です');
  }

  // ユーザ名の重複チェック
  const throwUserNameConflict = () => {
    throw new ServiceError('CONFLICT', 'ご入力いただいたユーザ名は既に使用されています');
  };
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUser) {
    throwUserNameConflict();
  }

  // パスワードのハッシュ化
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 8,
    parallelism: 1,
  });

  try {
    // ユーザーの作成
    // usernameは重複チェックを事前に行なっていますが、同時リクエスト時に片方が落ちた時のため、DB側のユニーク制約エラーもハンドリングします
    // emailは将来的に追加する場合に備えたカラムです(現在未使用)
    const user = await prisma.user.create({
      data: {
        username,
        email: null,
        passwordHash,
        sessionVersion: 1,
        lastLoginAt: new Date(),
        lastActiveAt: new Date(),
      },
    });

    return { user };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        // ユニーク制約違反
        error.code === 'P2002'
        && Array.isArray(error.meta?.target)
        && error.meta.target.includes("username")
      ) {
        throwUserNameConflict();
      }
    }
    
    throw error;
  }
};
