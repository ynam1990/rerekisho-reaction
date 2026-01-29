import { createSlice } from '@reduxjs/toolkit'
import {
  initializeAuthThunk,
  signInThunk,
} from './authThunks';

type AuthState = {
  isInitialized?: boolean;
  isAuthenticated: boolean;
  currentUserName: string;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  currentUserName: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login (state, action: { payload: { currentUserName: string } }) {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
    },
    logout (state) {
      state.isAuthenticated = false;
      state.currentUserName = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuthThunk.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.currentUserName = action.payload.currentUserName;
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
    });
  }
});

export const {
  login,
  logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
