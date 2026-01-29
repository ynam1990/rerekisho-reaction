import { createSlice } from '@reduxjs/toolkit'
import type { ResumeListItem, ResumeObj } from '@/shared/api/types'

type ResumeState = {
  resume: ResumeObj;
  resumeList: ResumeListItem[];
};

const createInitialResumeObj = (): ResumeObj => {
  const initialResumeObj: ResumeObj = {
    id: '',
    name: '',
    isPublished: false,
    isGenderVisible: true,
    isContactVisible: true,
    updatedAt: '',
    values: {
      displayDate: '',
      name: '',
      nameRuby: '',
      familyName: '',
      familyNameRuby: '',
      birthdate: '',
      gender: '',
      photoImg: '',
      address: {
        postalCode: '',
        line1: '',
        line2: '',
        line1Ruby: '',
        line2Ruby: '',
        tel: '',
        email: '',
      },
      contactAddress: {
        postalCode: '',
        line1: '',
        line2: '',
        line1Ruby: '',
        line2Ruby: '',
        tel: '',
        email: '',
      },
      educations: {
        ids: ['edu_1'],
        entities: {
          edu_1: {
            year: '',
            month: '',
            content: '',
          },
        } as ResumeObj['values']['educations']['entities'],
      },
      experiences: {
        ids: ['exp_1'],
        entities: {
          exp_1: {
            year: '',
            month: '',
            content: '',
          },
        } as ResumeObj['values']['experiences']['entities'],
      },
      certifications: {
        ids: ['cert_1'],
        entities: {
          cert_1: {
            year: '',
            month: '',
            content: '',
          },
        } as ResumeObj['values']['certifications']['entities'],
      },
      customs: {
        ids: ['cus_1', 'cus_2'],
        entities: {
          cus_1: {
            label: '志望の動機、特技、好きな学科、アピールポイントなど',
            content: '',
          },
          cus_2: {
            label: '本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）',
            content: '',
          },
        } as ResumeObj['values']['customs']['entities'],
      },
    },
  };

  return initialResumeObj;
};

const initialState: ResumeState = {
  resume: createInitialResumeObj(),
  resumeList: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updateResume: (state, action: { payload: Partial<ResumeObj> }) => {
      state.resume = {
        ...state.resume,
        ...action.payload,
      };
    },
    updateValues(state, action: { payload: Partial<ResumeObj['values']> }) {
      state.resume.values = {
        ...state.resume.values,
        ...action.payload,
      };
    },
    updateEntities<T extends 'educations' | 'experiences' | 'certifications' | 'customs'>(
      state: any,
      action: {
        payload: {
          key: T;
          id: ResumeObj['values'][T]['ids'][number];
          data: any;
        };
      }
    ) {
      const { key, id, data } = action.payload;
      
      state.resume.values[key].entities[id] = data;
    },
    addToEntities<T extends 'educations' | 'experiences' | 'certifications' | 'customs'>(
      state: any,
      action: {
        payload: {
          key: T;
          data: any;
        };
      }
    ) {
      const { key, data } = action.payload;

      // 現在最も大きいid番号を取得する
      const maxNum = state.resume.values[key].ids.reduce((maxNum: number, currentId: string) => {
        const idNum = parseInt(currentId.split('_')[1]);
        return idNum > maxNum ? idNum : maxNum;
      }, 0);
      
      const id = `${ key.slice(0, 3) }_${ maxNum + 1 }`;
      state.resume.values[key].ids.push(id);
      state.resume.values[key].entities[id] = data;
    },
    removeFromEntities<T extends 'educations' | 'experiences' | 'certifications' | 'customs'>(
      state: any,
      action: {
        payload: {
          key: T;
          id: ResumeObj['values'][T]['ids'][number];
        };
      }
    ) {
      const { key, id } = action.payload;
      state.resume.values[key].ids = state.resume.values[key].ids.filter((itemId: string) => itemId !== id);
      delete state.resume.values[key].entities[id];

      // もし0件になった場合は、1件分の空データを追加します（customsは0件を許容）
      if (state.resume.values[key].ids.length === 0 && key !== 'customs') {
        const newId = `${key.slice(0, 3)}_1`;
        state.resume.values[key].ids.push(newId);
        state.resume.values[key].entities[newId] = structuredClone(EMPTY_YEAR_MONTH_DATA);
      }
    },
  }
});

export const {
  updateResume,
  updateValues,
  updateEntities,
  addToEntities,
  removeFromEntities,
} = resumeSlice.actions;
export const resumeReducer = resumeSlice.reducer;

export const EMPTY_YEAR_MONTH_DATA = {
  year: '',
  month: '',
  content: '',
} as const;

export const EMPTY_CUSTOM_DATA = {
  label: '',
  content: '',
} as const;
