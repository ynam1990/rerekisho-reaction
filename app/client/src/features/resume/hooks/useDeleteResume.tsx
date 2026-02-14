import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { useModal } from "@/shared/hooks/useModal";
import { useToast } from "@/shared/hooks/useToast";
import { deleteResumeThunk } from "@/features/resume";
import { hasMessage } from "@/shared/utils/check";
import { Button } from "@/shared/ui/atoms";
import { ModalButtonsWrapper } from "@/shared/ui/molecules";

export const useDeleteResume = () => {
  const dispatch = useAppDispatch();
  const { showModalWithOptions, hideModal } = useModal();
  const showToastWithOptions = useToast();

  const deleteResume = useCallback(
    async (resumeId: string, resumeName: string, onAfterDelete?: (deletedResumeId: string) => void) => {
      const onExecDeleteButtonClick = async () => {
        hideModal();

        try {
          const { resumeId: deletedResumeId } = await dispatch(deleteResumeThunk({ resumeId })).unwrap();
          showToastWithOptions({
            icon: 'success',
            content: '履歴書の削除が完了しました',
          });
          
          if (onAfterDelete) {
            onAfterDelete(deletedResumeId);
          }
        } catch (error) {
          showToastWithOptions({
            icon: 'error',
            content: (hasMessage(error) && error.message) || '履歴書の削除に失敗しました',
          });
        }
      }

      showModalWithOptions({
        title: '履歴書の削除',
        content: `${ resumeName } を削除してもよろしいですか？`,
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
    },
    [dispatch, showModalWithOptions, hideModal, showToastWithOptions]
  );

  return { deleteResume };
};
