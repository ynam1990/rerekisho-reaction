import type { ResumeObj } from "@/shared/api/types";
import { useAppDispatch } from "@/app/store/hooks";
import { putResumeThunk } from "@/features/resume";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const useUpdateResume = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const updateResume = async (resume: ResumeObj, onAfterUpdate?: () => void) => {
    try {
      await dispatch(putResumeThunk({
        resumeId: resume.id,
        resumeData: resume,
      })).unwrap();

      showToastWithOptions({
        icon: 'success',
        content: '履歴書の保存が完了しました',
      });

      if (onAfterUpdate) onAfterUpdate();
    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || '履歴書の保存に失敗しました',
      });
    }
  };

  return { updateResume };
};
