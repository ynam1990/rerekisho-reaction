import { prisma } from "../../utils/prisma.js";

export type GetMeInput = {
  userId: number;
  lastActiveAt: Date;
};

export type GetMeResult = {
  lastActiveAt: Date;
};

export const getMeService = async (input: GetMeInput): Promise<GetMeResult> => {
  const { userId, lastActiveAt } = input;

  // セッションの最終アクティブ日時が10分以上前なら更新
  const currentDate = new Date();
  let lastActiveAtToReturn = lastActiveAt;
  if (
    !lastActiveAt
    || (currentDate.getTime() - new Date(lastActiveAt).getTime()) > 10 * 60 * 1000
  ) {
    // 最終アクティブ日時の更新
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { lastActiveAt: currentDate },
    });
    lastActiveAtToReturn = updated.lastActiveAt;
  }

  return {
    lastActiveAt: lastActiveAtToReturn
  };
};
