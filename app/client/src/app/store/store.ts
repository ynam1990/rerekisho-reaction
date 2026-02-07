import { configureStore } from "@reduxjs/toolkit";
import { appPrefsReducer } from "@/shared/model/appPrefsSlice";
import { appPrefsListenerMiddleware } from "@/shared/model/appPrefsListeners";
import { authReducer, authListenerMiddleware } from "@/features/auth";
import { resumeReducer } from "@/features/resume";

export const store = configureStore({
  reducer: {
    appPrefs: appPrefsReducer,
    auth: authReducer,
    resume: resumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      authListenerMiddleware.middleware,
      appPrefsListenerMiddleware.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
