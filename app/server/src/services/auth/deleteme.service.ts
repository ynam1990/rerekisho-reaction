import { ServiceError } from "../../errors/ServiceError.js";
import { prisma } from "../../utils/prisma.js";

export type DeleteMeInput = {
  userId: number;
};

export type DeleteMeResult = {
  success: true;
};

export const deleteMeService = async (input: DeleteMeInput): Promise<DeleteMeResult> => {
  const { userId } = input;

  // 削除対象ユーザーの確認
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new ServiceError(
      'NOT_FOUND',
      '削除対象のユーザーが存在しません',
    );
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return {
    success: true,
  };
};
