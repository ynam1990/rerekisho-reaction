import { MAX_RESUME_COUNT_PER_USER, MAX_FILE_SIZE_BYTES, ALLOWED_IMAGE_MIME_TYPES } from '../../constants/env.const.js';
import { ResumeObj } from '../../contracts/types.js';
import { ServiceError } from '../../errors/ServiceError.js';
import { dataURLToBytes } from '../../utils/format_data_url.js';
import { prisma } from '../../utils/prisma.js';

export type PostResumeInput = {
  userId: number;
  resume: ResumeObj;
};

export type PostResumeResult = {
  resumeId: string;
  updatedAt: string;
};

// 新規作成・更新両用のupsertサービス
export const postResumeService = async (input: PostResumeInput): Promise<PostResumeResult> => {
  const { resume, userId } = input;

  let result;
  if (resume.id) {
    // 更新の場合
    // 更新対象の存在確認
    const existing = await prisma.resume.findUnique({
      where: { id: resume.id, userId },
      include: {
        values: {
          select: { id: true },
        },
      },
    });
    if (!existing) {
      throw new ServiceError('NOT_FOUND', '更新対象の履歴書データを取得できませんでした');
    }
    
    const newData = formatResumeDataForDB(false, resume);

    // トランザクション開始
    result = await prisma.$transaction(async (tx) => {
      // 更新の場合、photoDataが送信されてこなかった時は既存画像を削除します
      if (!resume.values.photoImg && existing.values?.id) {
        await tx.resumePhotoImg.deleteMany({
          where: { resumeValuesId: existing.values.id },
        });
      }

      // DBを更新
      return await tx.resume.update({
        where: { id: resume.id, userId },
        data: newData,
      });
    });
  } else {
    // 新規作成の場合
    // 上限数を確認
    const existingCount = await prisma.resume.count({
      where: { userId },
    });

    if (existingCount >= MAX_RESUME_COUNT_PER_USER) {
      throw new ServiceError('BAD_REQUEST', '履歴書の作成上限数に達しています');
    }

    const newData = formatResumeDataForDB(true, resume);

    result = await prisma.resume.create({
      data: {
        ...newData,
        userId,
      },
    });
  }

  return {
    resumeId: result.id,
    updatedAt: result.updatedAt.toISOString(),
  };
};

const formatResumeDataForDB = (isCreate: boolean, resume: ResumeObj) => {
  const {
    id,
    updatedAt,
    values,
    ...restResume
  } = resume;
  const {
    displayDate,
    birthdate,
    photoImg,
    address,
    contactAddress,
    educations,
    experiences,
    certifications,
    customs,
    ...restValues
  } = values;
  // 画像はバイナリに戻して保存します
  let photoData = null;
  if (photoImg) {
    const { mimeType, bytes } = dataURLToBytes(photoImg);

    // ファイルサイズチェック
    if (bytes.length > MAX_FILE_SIZE_BYTES) {
      throw new ServiceError('BAD_REQUEST', 'アップロード可能な画像の最大サイズを超えています');
    }
    // MIMEタイプチェック
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(mimeType)) {
      throw new ServiceError('BAD_REQUEST', '画像形式はjpeg、png、gif、webpのいずれかである必要があります');
    }

    photoData = {
      mimeType,
      imgData: bytes,
    };
  }

  // DB更新用のデータを組み立てます
  const opKey = isCreate ? 'create' : 'update';
  const deleteManyQuery = isCreate ? {} : { deleteMany: {} };
  const newData = {
    ...restResume,
    values: {
      [opKey]: {
        displayDate: displayDate ? new Date(displayDate) : null,
        birthdate: birthdate ? new Date(birthdate) : null,
        ...restValues,
        photoImg: photoData
          ? {
            upsert: {
              create: photoData,
              update: photoData,
            },
          }
          : {},
        address: {
          [opKey]: address,
        },
        contactAddress: {
          [opKey]: contactAddress,
        },
        // 各エンティティは既存データを削除するトランザクション内で再作成します
        educationEntities: {
          ...deleteManyQuery,
          create: educations.ids.map((entityId, index) => {
            const entity = educations.entities[entityId];

            return {
              entityId,
              year: entity?.year || '',
              month: entity?.month || '',
              content: entity?.content || '',
              entityIndex: index,
            };
          }),
        },
        experienceEntities: {
          ...deleteManyQuery,
          create: experiences.ids.map((entityId, index) => {
            const entity = experiences.entities[entityId];

            return {
              entityId,
              year: entity?.year || '',
              month: entity?.month || '',
              content: entity?.content || '',
              entityIndex: index,
            };
          }),
        },
        certificationEntities: {
          ...deleteManyQuery,
          create: certifications.ids.map((entityId, index) => {
            const entity = certifications.entities[entityId];

            return {
              entityId,
              year: entity?.year || '',
              month: entity?.month || '',
              content: entity?.content || '',
              entityIndex: index,
            };
          }),
        },
        customEntities: {
          ...deleteManyQuery,
          create: customs.ids.map((entityId, index) => {
            const entity = customs.entities[entityId];

            return {
              entityId,
              label: entity?.label || '',
              content: entity?.content || '',
              entityIndex: index,
            };
          }),
        },
      },
    }
  };

  return newData;
};
