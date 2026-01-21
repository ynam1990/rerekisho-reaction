import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  isAuthenticated: boolean;
  currentUserId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUserId: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login (state, action: { payload: { currentUserId: string } }) {
      state.isAuthenticated = true;
      state.currentUserId = action.payload.currentUserId;
    },
    logout (state) {
      state.isAuthenticated = false;
      state.currentUserId = null;
    },
  }
});

export const {
  login,
  logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
