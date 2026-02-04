import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PublishedImg, ResumeItemMenuContent, ResumeListRow, ResumeListTopRow, ResumeListWrapper, ResumeName, StyledHeading } from "./ResumeList.styles"
import { Button, Text } from "@/shared/ui/atoms";
import { ButtonGroup, Popover, type GroupedButtonProps } from "@/shared/ui/molecules";
import publishedImg from '@/shared/assets/icons/icon_published.png'
import dayjs from "dayjs";
import type { ResumeListItem } from "@/shared/api/types";
import { useCreateResume, useDeleteResume, useGetResumes } from "@/features/resume";

type Props = {
  resumeList: ResumeListItem[];
};

export const ResumeList = (props: Props) => {
  const { resumeList } = props;

  const navigate = useNavigate();
  const { getResumes } = useGetResumes();
  const { createResume } = useCreateResume();
  const { deleteResume } = useDeleteResume();

  useEffect(() => {
    getResumes();
  }, []);

  const buttonProps = (resume: ResumeListItem) : GroupedButtonProps[] => {
    return [
      {
        styleType: 'solid',
        color: 'primary',
        size: 'md',
        children: '編集',
        onClick: () => {
          navigate(`/resumes/${ resume.id }`);
        },
      },
      {
        styleType: 'solid',
        color: 'danger',
        size: 'md',
        children: '削除',
        onClick: () => {
          deleteResume(resume.id, resume.name);
        },
      },
    ];
  };

  return (
    <ResumeListWrapper>
      <ResumeListTopRow>
        <StyledHeading size="lg">
          履歴書一覧
        </StyledHeading>
        <Button
          styleType="solid"
          color="primary"
          onClick={ () => createResume(
            (newResumeId: string) => navigate(`/resumes/${ newResumeId }`)
          ) }
        >
          新規作成
        </Button>
      </ResumeListTopRow>
      {
        resumeList.map((resume) => {
          return (
            <ResumeListRow
              key={ resume.id }
              onClick={ () => navigate(`/resumes/${ resume.id }`) }
            >
              <ResumeName>
                <Text>{ `[${ dayjs(resume.updatedAt).format('YYYY年MM月DD日') }更新]` }</Text>
                <Text>{ resume.name }</Text>
                { resume.isPublished && (
                  <PublishedImg
                    src={ publishedImg }
                    alt="アイコンはAI生成です"
                  />
                ) }
              </ResumeName>

              <Popover
                id={ `resume_item_${ resume.id }` }
                type='hamburger'
                color='tertiary'
                content={(
                  <ResumeItemMenuContent>
                    <ButtonGroup
                      $size='md'
                      $isBreakWhenSP={ true }
                      $flexDirection='column'
                      buttonPropsList={ buttonProps(resume) }
                    />
                  </ResumeItemMenuContent>
                )}
              />
            </ResumeListRow>
          );
        })
      }
    </ResumeListWrapper>
  );
};
