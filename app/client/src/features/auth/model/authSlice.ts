import { createSlice } from '@reduxjs/toolkit'
import { initializeAuthThunk, signUpThunk, signInThunk, signOutThunk, deleteUserThunk } from './authThunks';

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
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAuthThunk.fulfilled, (state, action) => {
      state.isInitialized = true;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.currentUserName = action.payload.currentUserName;
    });

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
    });

    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
    });

    builder.addCase(signOutThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUserName = '';
    });

    builder.addCase(deleteUserThunk.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUserName = '';
    });
  }
});

export const {} = authSlice.actions;
export const authReducer = authSlice.reducer;
