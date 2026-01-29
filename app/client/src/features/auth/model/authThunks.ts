import { createAsyncThunk } from "@reduxjs/toolkit";
import { callAPI } from "@/shared/api/request";
import type { GetMePair } from "@/shared/api/type";

export const initializeAuthThunk = createAsyncThunk<
  { isAuthenticated: boolean; currentUserName: string; },
  void
>(
  '/auth/me',
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
