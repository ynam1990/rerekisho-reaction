import { createSlice } from '@reduxjs/toolkit'
import { initializeAuthThunk, signUpThunk, signInThunk, signOutThunk, deleteUserThunk } from './authThunks';

type AuthState = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  currentUserName: string;
  clientPrefsKey: string;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  currentUserName: '',
  clientPrefsKey: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuthThunk.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.currentUserName = action.payload.currentUserName;
      state.clientPrefsKey = action.payload.clientPrefsKey;
    });
    builder.addCase(initializeAuthThunk.rejected, (state, _action) => {
      state.isInitialized = true;
      state.isAuthenticated = false;
      state.currentUserName = '';
      state.clientPrefsKey = '';
    });

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
      state.clientPrefsKey = '';
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
      state.clientPrefsKey = '';
    });

    builder.addCase(signOutThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUserName = '';
      state.clientPrefsKey = '';
    });

    builder.addCase(deleteUserThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUserName = '';
      state.clientPrefsKey = '';
    });
  }
});

export const {} = authSlice.actions;
export const authReducer = authSlice.reducer;
