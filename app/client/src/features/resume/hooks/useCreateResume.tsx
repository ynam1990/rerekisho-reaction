import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { createInitialResumeObj, postResumeThunk } from "@/features/resume";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const useCreateResume = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const createResume = useCallback(
    async (onAfterCreate: (newResumeId: string) => void) => {
      try {
        // 新規データを作成してPOSTします
        const newResumeData = createInitialResumeObj();
        newResumeData.name = '新規履歴書';

        const { resumeId } = await dispatch(postResumeThunk({
          resumeData: newResumeData,
        })).unwrap();
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
    },
    [dispatch, showToastWithOptions]
  );

  return { createResume };
};
