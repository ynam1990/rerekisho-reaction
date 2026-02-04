import { callAPI } from "@/shared/api/request";
import type { ResumeListItem, ResumeObj, SuccessResponseWithResumeId, SuccessResponseWithResumeIdAndUpdatedAt } from "@/shared/api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetResumesPair, GetResumePair, PostResumePair, DeleteResumePair } from "@/shared/api/types";

export const getResumesThunk = createAsyncThunk<
  ResumeListItem[],
  void
>(
  'resume.getResumesThunk',
  async (_, thunkAPI) => {
    const { promise } = callAPI<GetResumesPair>(
      '/resumes',
      {
        method: 'GET',
      }
    );

    return await promise.then((response) => {
      // 履歴書一覧の取得成功
      return response;
    }).catch((error) => {
      // 履歴書一覧の取得失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const getResumeThunk = createAsyncThunk<
  ResumeObj,
  { resumeId: string; }
>(
  'resume.getResumeThunk',
  async (payload, thunkAPI) => {
    const { promise } = callAPI<GetResumePair>(
      `/resumes/${ payload.resumeId }`,
      {
        method: 'GET',
      }
    );

    return await promise.then((response) => {
      // 履歴書の取得成功
      return response;
    }).catch((error) => {
      // 履歴書の取得失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const postResumeThunk = createAsyncThunk<
  SuccessResponseWithResumeIdAndUpdatedAt,
  { resumeData: ResumeObj; }
>(
  'resume.postResumeThunk',
  async (payload, thunkAPI) => {
    const { promise } = callAPI<PostResumePair>(
      `/resumes`,
      {
        method: 'POST',
        body: payload.resumeData,
      }
    );

    return await promise.then((response) => {
      // 履歴書の作成・更新成功
      return response;
    }).catch((error) => {
      // 履歴書の作成・更新失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const deleteResumeThunk = createAsyncThunk<
  SuccessResponseWithResumeId,
  { resumeId: string; }
>(
  'resume.deleteResumeThunk',
  async (payload, thunkAPI) => {
    const { promise } = callAPI<DeleteResumePair>(
      `/resumes/${ payload.resumeId }`,
      {
        method: 'DELETE',
      }
    );

    return await promise.then((response) => {
      // 履歴書の削除成功
      return response;
    }).catch((error) => {
      // 履歴書の削除失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);
