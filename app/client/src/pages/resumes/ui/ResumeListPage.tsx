import { useEffect } from "react";
import { ResumeListPageWrapper } from "./ResumeListPage.styles"
import { ResumeList } from "@/features/resume";
import { useAppDispatch, useResumeSelector } from "@/app/store/hooks";
import { getResumesThunk } from "@/features/resume/model/resumeThunks";
import { useToast } from "@/shared/hooks/useToast";
import { hasMessage } from "@/shared/utils/check";

export const ResumeListPage = () => {
  const { resumeList } = useResumeSelector();
  const showToastWithOptions = useToast();

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        await dispatch(getResumesThunk()).unwrap();
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || '履歴書一覧の取得に失敗しました。',
        });
      }
    };
    
    fetchResumes();
  }, []);

  return (
    <ResumeListPageWrapper>
      <ResumeList resumeList={ resumeList } />
    </ResumeListPageWrapper>
  );
};
