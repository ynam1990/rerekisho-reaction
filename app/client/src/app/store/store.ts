import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "@/shared/model/appSlice";
import { authReducer } from "@/features/auth";
import { resumeReducer } from "@/features/resume";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    resume: resumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
