import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  isLogedIn: boolean,
}

const initialState: AuthState = {
  isLogedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login (state) {
      state.isLogedIn = true;
    },
    logout (state) {
      state.isLogedIn = false;
    }
  }
});

export const {
  login,
  logout,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
