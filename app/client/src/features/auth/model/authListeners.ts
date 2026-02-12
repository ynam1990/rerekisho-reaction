import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { initializeAuthThunk } from './authThunks';
import { loadPrefsFromLocalStorage } from '@/shared/utils/local_storage_io';
import { hydrateAppPrefs, resetAppPrefs } from '@/shared/model/appPrefsSlice';

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  matcher: isAnyOf(initializeAuthThunk.fulfilled, initializeAuthThunk.rejected),
  effect: async (action, listenerApi) => {
    if (initializeAuthThunk.fulfilled.match(action) && action.payload.isAuthenticated) {
      // ログイン中の場合
      const { clientPrefsKey } = action.payload;
      const localPrefs = loadPrefsFromLocalStorage(clientPrefsKey);
      if (localPrefs) {
        listenerApi.dispatch(hydrateAppPrefs(localPrefs));
        return;
      }
    }

    // 未ログインの場合（またはローカルストレージに保存された設定が無い場合）
    listenerApi.dispatch(resetAppPrefs());
  },
});
