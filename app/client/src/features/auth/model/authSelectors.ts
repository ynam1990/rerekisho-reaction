import type { RootState } from "@/app/store/store";

export const clientPrefsKeySelector = (state: RootState) => state.auth.clientPrefsKey;
