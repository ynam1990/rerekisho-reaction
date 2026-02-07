import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppPrefsSelector = () => useAppSelector((state) => state.appPrefs);
export const useAuthSelector = () => useAppSelector((state) => state.auth);
export const useResumeSelector = () => useAppSelector((state) => state.resume);
