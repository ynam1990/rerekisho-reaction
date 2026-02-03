import { ResumeListItem, ResumeObj } from '../../contracts/types.js';
import { prisma } from '../../utils/prisma.js';

export type GetResumesInput = {
  userId: number;
};

export type GetResumesResult = {
  resumeList: ResumeListItem[];
};

export const getResumesService = async (input: GetResumesInput): Promise<GetResumesResult> => {
  const { userId } = input;

  // DBからデータを取得
  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    omit: {
      userId: true,
      createdAt: true,
      isGenderVisible: true,
      isContactVisible: true,
    },
  });

  const resumeList: ResumeListItem[] = resumes.map(resume => ({
    id: resume.id,
    name: resume.name,
    isPublished: resume.isPublished,
    updatedAt: resume.updatedAt.toISOString(),
  }));

  return { resumeList };
};
