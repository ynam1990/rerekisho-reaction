import { ServiceError } from '../../errors/ServiceError.js';
import { prisma } from '../../utils/prisma.js';

export type DeleteResumeInput = {
  userId: number;
  resumeId: string;
};

export type DeleteResumeResult = {
  resumeId: string;
};

export const deleteResumeService = async (input: DeleteResumeInput): Promise<DeleteResumeResult> => {
  const { resumeId, userId } = input;

  // 削除対象の存在確認
  const existing = await prisma.resume.findUnique({
    where: { id: resumeId, userId },
  });
  if (!existing) {
    throw new ServiceError('NOT_FOUND', '削除対象の履歴書データを取得できませんでした');
  }

  const deleted = await prisma.resume.delete({
    where: { id: resumeId, userId },
  });

  return { resumeId: deleted.id };
};
