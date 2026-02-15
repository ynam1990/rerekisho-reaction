import { useCallback } from "react";
import { useAppDispatch } from "@/app/store/hooks";
import { deleteUserThunk } from "@/features/auth";
import { useModal } from "@/shared/hooks/useModal";
import { useToast } from "@/shared/hooks/useToast";
import { Button } from "@/shared/ui/atoms";
import { ModalButtonsWrapper } from "@/shared/ui/molecules";
import { hasMessage } from "@/shared/utils/check";

export const useDeleteMe = () => {
  const dispatch = useAppDispatch();
  const showToastWithOptions = useToast();
  const { showModalWithOptions, hideModal } = useModal();
  
  const deleteMe = useCallback(
    async (onAfterDelete?: () => void) => {
      const execDelete = async () => {
        try {
          await dispatch(deleteUserThunk()).unwrap();
          
          showModalWithOptions({
            title: 'ユーザー登録の削除が完了しました',
            content: 'ユーザー登録の削除が完了しました。ご利用いただきありがとうございました',
            footerContent: (
              <ModalButtonsWrapper>
                <Button
                  styleType="solid"
                  color="tertiary"
                  size="md"
                  onClick={ () => {
                    if (onAfterDelete) onAfterDelete();
                  } }
                >
                  閉じる
                </Button>
              </ModalButtonsWrapper>
            ),
            onEnterPress: () => {
              if (onAfterDelete) onAfterDelete();
            },
            onEscPress: () => {
              if (onAfterDelete) onAfterDelete();
            },
          });
        } catch (error) {
          showToastWithOptions({
            icon: 'error',
            content: (hasMessage(error) && error.message) || 'ユーザー削除に失敗しました。ページをリロードして再度お試しください',
          });
        }
      };

      showModalWithOptions({
        title: 'ユーザー登録の削除',
        content: 'ユーザー登録を削除すると、作成した履歴書データも全て削除されます。削除してもよろしいですか？',
        footerContent: (
          <ModalButtonsWrapper>
            <Button
              styleType="solid"
              color="tertiary"
              size="md"
              onClick={ () => hideModal() }
            >
              キャンセル
            </Button>
            <Button
              styleType="solid"
              color="primary"
              size="md"
              onClick={ () => {
                hideModal();
                execDelete();
              } }
            >
              削除する
            </Button>
          </ModalButtonsWrapper>
        ),
        onEnterPress: () => {
          execDelete();
        },
      });
    },
    [dispatch, showModalWithOptions, hideModal, showToastWithOptions]
  );

  return { deleteMe };
};
