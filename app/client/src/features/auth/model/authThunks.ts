import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "@/shared/api/request";
import type { GetMePair, PostSignUpAPIPair, PostSignInAPIPair } from "@/shared/api/types";

export const initializeAuthThunk = createAsyncThunk<
  { isAuthenticated: boolean; currentUserName: string; },
  void
>(
  'auth.initializeAuthThunk',
  async () => {
    // ログインチェック
    const { promise } = callAPI<GetMePair>(
      '/auth/me',
      {
        method: 'GET',
        suppressError: true,
      },
    );

    const result = await promise.then((response) => {
      // ログイン済み
      return {
        isAuthenticated: true,
        currentUserName: response.username || '',
      };
    }).catch(() => {
      // 未ログインまたはセッション切れ
      return {
        isAuthenticated: false,
        currentUserName: '',
      };
    });

    return result;
  }
);

export const signUpThunk = createAsyncThunk<
  { currentUserName: string; },
  { username: string; password: string; agreement: boolean; }
>(
  'auth.signUpThunk',
  async (payload, thunkAPI) => {
    const { promise } = callAPI<PostSignUpAPIPair>(
      '/auth/signup',
      {
        method: 'POST',
        body: {
          username: payload.username,
          password: payload.password,
          agreement: payload.agreement,
        },
      }
    );

    return await promise.then(() => {
      // サインアップ成功
      return {
        currentUserName: payload.username,
      };
    }).catch((error) => {
      // サインアップ失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const signInThunk = createAsyncThunk<
  { currentUserName: string; },
  { username: string; password: string; }
>(
  'auth.signInThunk',
  async (payload, thunkAPI) => {
    const { promise } = callAPI<PostSignInAPIPair>(
      '/auth/signin',
      {
        method: 'POST',
        body: {
          username: payload.username,
          password: payload.password,
        },
      }
    );

    return await promise.then(() => {
      // サインイン成功
      return {
        currentUserName: payload.username,
      };
    }).catch((error) => {
      // サインイン失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const signOutThunk = createAsyncThunk(
  'auth.signOutThunk',
  async (_, thunkAPI) => {
    const { promise } = callAPI<PostSignInAPIPair>(
      '/auth/signout',
      {
        method: 'POST',
      }
    );

    return await promise.then(() => {
      // サインアウト成功
      return;
    }).catch((error) => {
      // サインアウト失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const deleteUserThunk = createAsyncThunk(
  'auth.deleteUserThunk',
  async (_, thunkAPI) => {
    const { promise } = callAPI<PostSignInAPIPair>(
      '/auth/me',
      {
        method: 'DELETE',
      }
    );

    return await promise.then(() => {
      // ユーザー削除成功
      return;
    }).catch((error) => {
      // ユーザー削除失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);
