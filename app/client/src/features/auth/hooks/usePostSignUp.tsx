import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { signUpThunk } from "@/features/auth";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const usePostSignUp = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const postSignUp = useCallback(
    async (data: { username: string; password: string; passwordConfirmation: string; agreement: boolean }, onAfterSignUp?: () => void) => {
      const { username, password, passwordConfirmation, agreement } = data;
      
      if (username.length < 4) {
        showToastWithOptions({
          icon: 'error',
          content: 'ユーザ名は4文字以上である必要があります',
        });
        return; 
      }
      if (password.length < 8) {
        showToastWithOptions({
          icon: 'error',
          content: 'パスワードは8文字以上である必要があります',
        });
        return;
      }
      if (password !== passwordConfirmation) {
        showToastWithOptions({
          icon: 'error',
          content: 'パスワードと確認用パスワードが一致しません',
        });
        return;
      }
      if (!agreement) {
        showToastWithOptions({
          icon: 'error',
          content: '同意チェックが必要です',
        });
        return;
      }

      try {
        await dispatch(signUpThunk({ username, password, agreement })).unwrap();

        showToastWithOptions({
          icon: 'success',
          content: '登録が完了しました。新規作成ボタンから、履歴書をご作成いただけます',
        });

        if (onAfterSignUp) onAfterSignUp();
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || '登録に失敗しました。しばらく経ってから再度お試しください',
        });
      }
    },
    [dispatch, showToastWithOptions]
  );

  return { postSignUp };
};
