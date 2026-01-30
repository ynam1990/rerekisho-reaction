import { useAppDispatch } from "@/app/store/hooks";
import { getResumeThunk } from "@/features/resume";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const useGetResume = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const getResume = async (resumeId: string) => {
    try {
      await dispatch(getResumeThunk({ resumeId })).unwrap();
    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || '履歴書の取得に失敗しました。',
      });
    }
  };

  return { getResume };
};
