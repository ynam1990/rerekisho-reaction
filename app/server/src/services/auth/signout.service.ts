import { ServiceError } from "../../errors/ServiceError.js";
import { prisma } from "../../utils/prisma.js";

export type SignOutInput = {
  userId: number;
};

export type SignOutResult = {
  success: true;
};

export const signOutService = async (input: SignOutInput): Promise<SignOutResult> => {
  const { userId } = input;

  if (!userId) {
    throw new ServiceError('BAD_REQUEST', 'ユーザIDは必須です');
  }

  // 最終アクティブ時刻の更新
  const currentDate = new Date();
  await prisma.user.update({
    where: { id: userId },
    data: {
      lastActiveAt: currentDate,
    },
  });

  return { success: true };
};
