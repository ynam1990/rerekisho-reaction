import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';
import { isPartialLocalPrefs, setAppPrefs } from './appPrefsSlice';
import type { AppDispatch, RootState } from '@/app/store/store';
import { clientPrefsKeySelector } from '@/features/auth/model/authSelectors';
import { savePrefsToLocalStorage } from '@/shared/utils/local_storage_io';

export const appPrefsListenerMiddleware = createListenerMiddleware();

(appPrefsListenerMiddleware.startListening as TypedStartListening<RootState, AppDispatch>)({
  actionCreator: setAppPrefs,
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState();
    const clientPrefsKey = clientPrefsKeySelector(state);
    
    // ローカルストレージに保存
    savePrefsToLocalStorage(
      clientPrefsKey,
      isPartialLocalPrefs(state.appPrefs) ? state.appPrefs : {}
    );
  }
});
