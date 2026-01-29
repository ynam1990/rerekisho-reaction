import { callAPI } from "@/shared/api/request";
import type { ResumeListItem, ResumeObj, SuccessResponseWithResumeId } from "@/shared/api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { GetResumesPair, GetResumePair, PostResumePair, PutResumePair, DeleteResumePair } from "@/shared/api/types";

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
  SuccessResponseWithResumeId,
  void
>(
  'resume.postResumeThunk',
  async (_, thunkAPI) => {
    const { promise } = callAPI<PostResumePair>(
      '/resumes',
      {
        method: 'POST',
      }
    );

    return await promise.then((response) => {
      // 履歴書の作成成功
      return response;
    }).catch((error) => {
      // 履歴書の作成失敗
      return thunkAPI.rejectWithValue({ message: error.message });
    });
  }
);

export const putResumeThunk = createAsyncThunk<
  SuccessResponseWithResumeId,
  { resumeId: string; resumeData: ResumeObj; }
>(
  'resume.putResumeThunk',
  async (payload, thunkAPI) => {
    const { promise } = callAPI<PutResumePair>(
      `/resumes/${ payload.resumeId }`,
      {
        method: 'PUT',
        body: payload.resumeData,
      }
    );

    return await promise.then((response) => {
      // 履歴書の更新成功
      return response;
    }).catch((error) => {
      // 履歴書の更新失敗
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
