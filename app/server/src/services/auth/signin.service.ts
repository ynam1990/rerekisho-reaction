import { ServiceError } from "../../errors/ServiceError.js";
import { prisma } from "../../utils/prisma.js";
import type { User } from "../../utils/prisma.types.js";
import argon2 from "argon2";

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

  // ユーザの取得
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    throw new ServiceError('UNAUTHORIZED', '存在しないユーザ名です');
  }

  // パスワードの検証
  const isPasswordValid = await argon2.verify(user.passwordHash, password);
  if (!isPasswordValid) {
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

  return { user: updated };
};
