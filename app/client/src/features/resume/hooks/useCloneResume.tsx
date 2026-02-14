import { useCallback } from "react";
import { useGetResume, useUpdateResume } from "@/features/resume";
import { useToast } from "@/shared/hooks/useToast";

export const useCloneResume = () => {
  const { getResume } = useGetResume();
  const { updateResume } = useUpdateResume();
  const showToastWithOptions = useToast();

  const cloneResume = useCallback(
    async (originalResumeId: string, onAfterClone: (clonedResumeId: string) => void) => {
      try {
        // 元の履歴書データを取得
        await getResume(originalResumeId, async (originalResume) => {
          if (!originalResume) {
            showToastWithOptions({
              icon: 'error',
              content: '複製元データの取得に失敗しました',
            });
            return;
          }

          // 複製用の履歴書データを作成（idを空にして新規作成します）
          const newResumeData = {
            ...originalResume,
            id: '',
            name: `[複製] ${  originalResume.name }`,
          };

          // 複製データを保存します
          await updateResume(newResumeData, (clonedResumeId) => {
            showToastWithOptions({
              icon: 'success',
              content: '履歴書を複製しました',
            });

            onAfterClone(clonedResumeId);
          });
        });
      } catch (error) {
        showToastWithOptions({
          icon: 'error',
          content: '履歴書の複製に失敗しました',
        });
      }
    },
    [getResume, updateResume, showToastWithOptions]
  );

  return { cloneResume };
};
