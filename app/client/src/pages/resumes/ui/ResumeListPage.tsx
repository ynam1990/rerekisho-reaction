import { ResumeList } from "@/features/resume";
import { ResumeListPageWrapper } from "./ResumeListPage.styles"
import { useResumeSelector } from "@/app/store/hooks";

export const ResumeListPage = () => {
  const { resumeList } = useResumeSelector();

  return (
    <ResumeListPageWrapper>
      <ResumeList resumeList={ resumeList } />
    </ResumeListPageWrapper>
  );
};
