import { useNavigate } from "react-router-dom";
import { PublishedImg, ResumeItemMenuContent, ResumeListRow, ResumeListTopRow, ResumeListWrapper, ResumeName, StyledHeading } from "./ResumeList.styles"
import { Button, Text } from "@/shared/ui/atoms";
import { ButtonGroup, Popover, type GroupedButtonProps } from "@/shared/ui/molecules";
import publishedImg from '@/shared/assets/icons/icon_published.png'
import dayjs from "dayjs";

// 一時的なモックデータ
const resumeList = [
  {
    id: 'sample1',
    name: '新規履歴書1',
    isPublished: true,
    updatedAt: '2026-01-03',
  },
  {
    id: 'sample2',
    name: '新規履歴書2',
    isPublished: false,
    updatedAt: '2026-01-04',
  },
];

type ResumeListItem = typeof resumeList[number];


const createNewResume = () => {
  // 新規作成処理
};

export const ResumeList = () => {
  const navigate = useNavigate();

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
        color: 'secondary',
        size: 'md',
        children: '公開',
        onClick: () => {
          // 公開処理
        },
      },
      {
        styleType: 'solid',
        color: 'danger',
        size: 'md',
        children: '削除',
        onClick: () => {
          // 削除処理
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
          onClick={ createNewResume }
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
                <Text>{ `[${ dayjs(resume.updatedAt).format('YYYY年MM月DD日') }]` }</Text>
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
