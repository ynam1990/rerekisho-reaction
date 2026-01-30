import { useAppDispatch } from "@/app/store/hooks";
import { postResumeThunk } from "@/features/resume";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const useCreateResume = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const createResume = async (onAfterCreate: (newResumeId: string) => void) => {
    try {
      const { resumeId } = await dispatch(postResumeThunk()).unwrap();
      showToastWithOptions({
        icon: 'success',
        content: '新しい履歴書の作成が完了しました',
      });

      onAfterCreate(resumeId);
    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || '新しい履歴書の作成に失敗しました',
      });
    }
  };

  return { createResume };
};
