import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  currentEnv: '' | 'local' | 'staging' | 'production'
}

const initialState: AppState = {
  currentEnv: ''
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    switchToLocal (state) {
      state.currentEnv = 'local';
    },
    switchToProd (state) {
      state.currentEnv = 'production';
    },
  }
});

export const {
  switchToLocal,
  switchToProd,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
