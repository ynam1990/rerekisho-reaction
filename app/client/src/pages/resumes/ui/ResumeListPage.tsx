import { ResumeListPageWrapper } from "./ResumeListPage.styles"
import { ResumeList } from "@/features/resume";
import { useResumeSelector } from "@/app/store/hooks";

export const ResumeListPage = () => {
  const { resumeList } = useResumeSelector();

  return (
    <ResumeListPageWrapper>
      <ResumeList resumeList={ resumeList } />
    </ResumeListPageWrapper>
  );
};
