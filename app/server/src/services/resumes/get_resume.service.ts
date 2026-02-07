import { ResumeObj } from '../../contracts/types.js';
import { ServiceError } from '../../errors/ServiceError.js';
import { bytesToDataURL } from '../../utils/format_data_url.js';
import { createEmptyAddressData, createEmptyContactAddressData } from '../../utils/format_empty_data.js';
import { toDateString } from '../../utils/format_time.js';
import { prisma } from '../../utils/prisma.js';

export type GetResumeInput = {
  userId: number;
  resumeId: string;
};

export type GetResumeResult = {
  resume: ResumeObj;
};

export const getResumeService = async (input: GetResumeInput): Promise<GetResumeResult> => {
  const { resumeId, userId } = input;

  // DBからデータを取得
  const resume = await prisma.resume.findUnique({
    where: {
      id: resumeId,
      // ユーザ本人のみアクセス可能
      userId,
    },
    omit: { userId: true, createdAt: true },
    include: {
      values: {
        omit: { id: true, resumeId: true },
        include: {
          photoImg: true,
          address: {
            omit: { id: true, resumeValuesId: true },
          },
          contactAddress: {
            omit: { id: true, resumeValuesId: true },
          },
          educationEntities: {
            orderBy: { entityIndex: 'asc' },
          },
          experienceEntities: {
            orderBy: { entityIndex: 'asc' },
          },
          certificationEntities: {
            orderBy: { entityIndex: 'asc' },
          },
          customEntities: {
            orderBy: { entityIndex: 'asc' },
          },
          cvTopicEntities: {
            orderBy: { entityIndex: 'asc' },
          },
        },
      },
    },
  });

  // もし存在しない場合はエラーを返します
  if (!resume) {
    throw new ServiceError('NOT_FOUND', '履歴書データを取得できませんでした');
  }

  // JSで扱うためのデータを組み立てます
  const {
    updatedAt,
    values,
    ...rest
  } = resume;
  const resumeObj = rest as Partial<ResumeObj>;
  resumeObj.updatedAt = resume.updatedAt.toISOString();

  const {
    photoImg,
    address,
    contactAddress,
    educationEntities,
    experienceEntities,
    certificationEntities,
    customEntities,
    cvTopicEntities,
    displayDate,
    birthdate,
    ...restValues
  } = values!;

  // 基本情報
  const valuesObj: Partial<ResumeObj['values']> = restValues;
  valuesObj.displayDate = toDateString(displayDate);
  valuesObj.birthdate = toDateString(birthdate);

  // 写真はBase64画像に戻す
  valuesObj.photoImg = photoImg
    ? bytesToDataURL(photoImg.imgData, photoImg.mimeType)
    : '';
  
  // 住所・連絡先
  valuesObj.address = address || createEmptyAddressData();
  valuesObj.contactAddress = contactAddress || createEmptyContactAddressData();

  // 各エンティティ
  valuesObj.educations = {
    ids: [],
    entities: {},
  };
  educationEntities.forEach((entity) => {
    valuesObj.educations!.ids.push(entity.entityId);
    valuesObj.educations!.entities[entity.entityId] = {
      year: entity.year,
      month: entity.month,
      content: entity.content,
    };
  });

  valuesObj.experiences = {
    ids: [],
    entities: {},
  };
  experienceEntities.forEach((entity) => {
    valuesObj.experiences!.ids.push(entity.entityId);
    valuesObj.experiences!.entities[entity.entityId] = {
      year: entity.year,
      month: entity.month,
      content: entity.content,
    };
  });

  valuesObj.certifications = {
    ids: [],
    entities: {},
  };
  certificationEntities.forEach((entity) => {
    valuesObj.certifications!.ids.push(entity.entityId);
    valuesObj.certifications!.entities[entity.entityId] = {
      year: entity.year,
      month: entity.month,
      content: entity.content,
    };
  });

  valuesObj.customs = {
    ids: [],
    entities: {},
  };
  customEntities.forEach((entity) => {
    valuesObj.customs!.ids.push(entity.entityId);
    valuesObj.customs!.entities[entity.entityId] = {
      label: entity.label,
      content: entity.content,
    };
  });

  valuesObj.cvTopics = {
    ids: [],
    entities: {},
  };
  cvTopicEntities.forEach((entity) => {
    valuesObj.cvTopics!.ids.push(entity.entityId);
    valuesObj.cvTopics!.entities[entity.entityId] = {
      label: entity.label,
      content: entity.content,
    };
  });

  // 型は合っているはずなので型アサーションで通します
  resumeObj.values = valuesObj as ResumeObj['values'];
  
  return { resume: resumeObj as ResumeObj };
};
