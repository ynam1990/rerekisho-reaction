import { createSlice } from '@reduxjs/toolkit'
import { isUndefined } from '@/shared/utils/check';

export type ResumeEditorPrefs = {
  editorPanelWidth: number;
};
export type LocalPrefs = ResumeEditorPrefs;

export const isPartialLocalPrefs = (obj: any): obj is Partial<LocalPrefs> => {
  if (typeof obj !== 'object' || obj === null) return false;

  if (!isUndefined(obj.editorPanelWidth) && typeof obj.editorPanelWidth !== 'number') return false;

  return true;
};

type AppPrefsState = {
  // 未使用のためコメントアウトしています
  // currentEnv: '' | 'development' | 'production';
} & LocalPrefs;

const initialState: AppPrefsState = {
  // currentEnv: '',
  editorPanelWidth: 320,
};

const appPrefsSlice = createSlice({
  name: 'appPrefs',
  initialState,
  reducers: {
    // switchToDev (state) {
    //   state.currentEnv = 'development';
    // },
    // switchToProd (state) {
    //   state.currentEnv = 'production';
    // },
    setAppPrefs (state, action: { payload: Partial<LocalPrefs> }) {
      const { editorPanelWidth } = action.payload;

      if (!isUndefined(editorPanelWidth)) {
        state.editorPanelWidth = editorPanelWidth;
      }
    },
    hydrateAppPrefs (state, action: { payload: Partial<LocalPrefs> }) {
      const { editorPanelWidth } = action.payload;

      if (!isUndefined(editorPanelWidth)) {
        state.editorPanelWidth = editorPanelWidth;
      }
    },
    resetAppPrefs (state) {
      Object.assign(state, initialState);
    },
  }
});

export const {
  // switchToLocal,
  // switchToProd,
  setAppPrefs,
  hydrateAppPrefs,
  resetAppPrefs,
} = appPrefsSlice.actions;
export const appPrefsReducer = appPrefsSlice.reducer;
