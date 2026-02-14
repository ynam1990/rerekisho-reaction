import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { signOutThunk } from "@/features/auth";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const usePostSignOut = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const postSignOut = useCallback(
    async (onAfterSignOut?: () => void) => {
      try {
        await dispatch(signOutThunk()).unwrap();

        showToastWithOptions({
          icon: 'success',
          content: 'ログアウトしました',
        });

        if (onAfterSignOut) onAfterSignOut();
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || 'ログアウトに失敗しました。ページをリロードして再度お試しください',
        });
      }
    },
    [dispatch, showToastWithOptions]
  );

  return { postSignOut };
};
