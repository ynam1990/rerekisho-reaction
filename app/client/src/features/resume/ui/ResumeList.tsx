import { useNavigate } from "react-router-dom";
import { ModalButtonsWrapper, PublishedImg, ResumeItemMenuContent, ResumeListRow, ResumeListTopRow, ResumeListWrapper, ResumeName, StyledHeading } from "./ResumeList.styles"
import { Button, Text } from "@/shared/ui/atoms";
import { ButtonGroup, Popover, type GroupedButtonProps } from "@/shared/ui/molecules";
import publishedImg from '@/shared/assets/icons/icon_published.png'
import dayjs from "dayjs";
import type { ResumeListItem } from "@/shared/api/types";
import { useModal } from "@/shared/hooks/useModal";
import { useToast } from "@/shared/hooks/useToast";
import { useAppDispatch } from "@/app/store/hooks";
import { deleteResumeThunk, postResumeThunk } from "@/features/resume/model/resumeThunks";
import { hasMessage } from "@/shared/utils/check";

type Props = {
  resumeList: ResumeListItem[];
};

export const ResumeList = (props: Props) => {
  const { resumeList } = props;

  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  const { showModalWithOptions, hideModal } = useModal();
  const navigate = useNavigate();

  const onCreateNewResume = async () => {
    try {
      const { resumeId } = await dispatch(postResumeThunk()).unwrap();
      showToastWithOptions({
        icon: 'success',
        content: '新しい履歴書の作成が完了しました',
      });
      navigate(`/resumes/${ resumeId }`);
    } catch (error) {
      showToastWithOptions({
        icon: 'error',
        content: (hasMessage(error) && error.message) || '新しい履歴書の作成に失敗しました',
      });
    }
  };

  const onDeleteResume = (resumeId: string) => {
    const targetResumeItem = resumeList.find((item) => item.id === resumeId);
    if (!targetResumeItem) {
      showToastWithOptions({
        icon: 'error',
        content: '予期せぬエラーが発生しました',
      });
      return;
    }

    const onExecDeleteButtonClick = async () => {
      hideModal();

      try {
        await dispatch(deleteResumeThunk({ resumeId })).unwrap();
        showToastWithOptions({
          icon: 'success',
          content: '履歴書の削除が完了しました',
        });
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: (hasMessage(error) && error.message) || '履歴書の削除に失敗しました',
        });
      }
    }

    showModalWithOptions({
      title: '履歴書の削除',
      content: `${ targetResumeItem.name } を削除してもよろしいですか？`,
      footerContent: (
        <ModalButtonsWrapper>
          <Button
            styleType="solid"
            color="tertiary"
            onClick={ () => {
              hideModal();
            } }
          >
            キャンセル
          </Button>
          <Button
            styleType="solid"
            color="danger"
            onClick={ onExecDeleteButtonClick }
          >
            削除する
          </Button>
        </ModalButtonsWrapper>
      )
    });
  };


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
          onDeleteResume(resume.id);
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
          onClick={ onCreateNewResume }
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
