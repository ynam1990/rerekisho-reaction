import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  isInitialized?: boolean;
  isAuthenticated: boolean;
  currentUserName: string | null;
}

const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  currentUserName: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticationState (state, action: { payload: { isInitialized: boolean; isAuthenticated: boolean; currentUserName: string } }) {
      state.isInitialized = action.payload.isInitialized;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.currentUserName = action.payload.currentUserName;
    },
    login (state, action: { payload: { currentUserName: string } }) {
      state.isAuthenticated = true;
      state.currentUserName = action.payload.currentUserName;
    },
    logout (state) {
      state.isAuthenticated = false;
      state.currentUserName = null;
    },
  }
});

export const {
  setAuthenticationState,
  login,
  logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
