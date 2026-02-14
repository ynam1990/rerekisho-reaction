import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { getResumeThunk } from "@/features/resume";
import type { ResumeObj } from "@/shared/api/types";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const useGetResume = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const getResume = useCallback(
    async (resumeId: string, onAfterGet?: (resume: ResumeObj) => void) => {
      try {
        const resume = await dispatch(getResumeThunk({ resumeId })).unwrap();
        
        if (onAfterGet) onAfterGet(resume);
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || '履歴書の取得に失敗しました。',
        });
      }
    },
    [dispatch, showToastWithOptions]
  );

  return { getResume };
};
