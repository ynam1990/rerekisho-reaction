import { isPartialLocalPrefs, type LocalPrefs } from "@/shared/model/appPrefsSlice";

const makeLocalStorageKey = (clientPrefsKey: string): string => {
  return `rr_${ clientPrefsKey }_prefs`;
};

export const savePrefsToLocalStorage = (clientPrefsKey: string, data: Partial<LocalPrefs>): boolean => {
  const storageKey = makeLocalStorageKey(clientPrefsKey);

  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    
    return true;
  } catch (error) {
    console.error('[Prefs Error] Failed to save preferences to localStorage.', error);

    return false;
  }
};

export const loadPrefsFromLocalStorage = (clientPrefsKey: string): Partial<LocalPrefs> | null => {
  const storageKey = makeLocalStorageKey(clientPrefsKey);

  try {
    const item = localStorage.getItem(storageKey);

    if (!item) {
      return null;
    }

    const parsed = JSON.parse(item);
    return isPartialLocalPrefs(parsed) ? parsed : null;
  } catch (error) {
    console.error('[Prefs Error] Failed to load preferences from localStorage.', error);

    return null;
  }
};
