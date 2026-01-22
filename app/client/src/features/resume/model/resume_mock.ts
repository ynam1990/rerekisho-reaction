// 一時的なモックデータ
export const resumeList = [
  {
    id: 'sample1',
    name: '新規履歴書1',
    isPublished: true,
    updatedAt: '2026-01-03',
  },
  {
    id: 'sample2',
    name: '新規履歴書2',
    isPublished: false,
    updatedAt: '2026-01-04',
  },
];
export type ResumeListItem = typeof resumeList[number];


// 一時的なモックデータ
export const resume = {
  id: 'sample',
  name: '新規履歴書',
  isPublished: true,
  isGenderVisible: true,
  isContactVisible: true,
  updatedAt: '2026-01-04',
  values: {
    displayDate: '2026-01-01',
    name: '花子',
    nameRuby: 'はなこ',
    familyName: '山田',
    familyNameRuby: 'やまだ',
    birthdate: '2000-01-01',
    gender: '女',
    photoImg: null,
    address: {
      postalCode: '0010001',
      line1: 'xx県xx区xxx-xx',
      line2: 'マンション名xx号室',
      line1Ruby: 'xxけんxxくxxx-xx',
      line2Ruby: 'マンションxxごうしつ',
      tel: '001-0000-0000',
      email: 'xxx@xxx.xx',
    },
    contactAddress: {
      postalCode: '0010001',
      line1: 'xx県xx区xxx-xx',
      line2: 'マンション名xx号室',
      line1Ruby: 'xxけんxxくxxx-xx',
      line2Ruby: 'マンションxxごうしつ',
      tel: '001-0000-0000',
      email: 'xxx@xxx.xx',
    },
    educations: {
      ids: ['edu_1', 'edu_2'],
      entities: {
        edu_1: {
          year: '2000',
          month: '1',
          content: '学歴x',
        },
        edu_2: {
          year: '2001',
          month: '2',
          content: '学歴xx',
        },
      },
    },
    experiences: {
      ids: ['exp_1', 'exp_2', 'exp_3'],
      entities: {
        exp_1: {
          year: '2002',
          month: '3',
          content: '職歴x',
        },
        exp_2: {
          year: '2004',
          month: '4',
          content: '職歴xx',
        },
        exp_3: {
          year: '2002',
          month: '3',
          content: '職歴xxx',
        },
      },
    },
    certifications: {
      ids: ['cer_1', 'cer_2'],
      entities: {
        cer_1: {
          year: '2005',
          month: '5',
          content: '資格x',
        },
        cer_2: {
          year: '2006',
          month: '6',
          content: '資格xx',
        },
      },
    },
    customs: {
      ids: ['cus_1', 'cus_2'],
      entities: {
        cus_1: {
          label: '志望の動機、特技、好きな学科、アピールポイントなど',
          content: 'xxxxxxxxxxxx',
        },
        cus_2: {
          label: '本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）',
          content: 'xxxxxxxxxxxx',
        },
      },
    },
    customP1: 'xxx',
    customP1Ruby: 'xxx',
  },
};
export type ResumeObj = typeof resume;
