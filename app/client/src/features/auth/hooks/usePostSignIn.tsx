import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { signInThunk } from "@/features/auth";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const usePostSignIn = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const postSignIn = useCallback(
    async (data: { username: string; password: string; }, onAfterSignIn?: () => void) => {
      const { username, password } = data;
      
      if (username.length === 0 || password.length === 0) {
        showToastWithOptions({
          icon: 'error',
          content: 'ユーザ名とパスワードを入力してください',
        });
        return; 
      }

      try {
        await dispatch(signInThunk({ username, password })).unwrap();

        showToastWithOptions({
          icon: 'success',
          content: 'ログインしました',
        });

        if (onAfterSignIn) onAfterSignIn();
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || 'ログインに失敗しました。しばらく経ってから再度お試しください',
        });
      }
    },
    [dispatch, showToastWithOptions]
  );

  return { postSignIn };
};
