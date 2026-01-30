import { useAppDispatch } from "@/app/store/hooks";
import { getResumesThunk } from "@/features/resume";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const useGetResumes = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  
  const getResumes = async () => {
    try {
      await dispatch(getResumesThunk()).unwrap();
    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || '履歴書一覧の取得に失敗しました。',
      });
    }
  };

  return { getResumes };
};
