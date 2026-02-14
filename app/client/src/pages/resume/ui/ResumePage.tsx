import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useElementRect } from "@/shared/hooks/useElementRect";
import { ResumePageContentScrollWrapper, ResumePageContentWrapper, ResumePageWrapper } from "./ResumePage.styles"
import { useGetResume, Resume, ResumeControls, ResumeEditor, resetResume, type ResumeEditorHandle, type ResumeHandle } from "@/features/resume";
import { useAppDispatch, useResumeSelector } from "@/app/store/hooks";
import { useToast } from "@/shared/hooks/useToast";

export const ResumePage = () => {
  const { resume } = useResumeSelector();
  const dispatch = useAppDispatch();

  // 履歴書データの取得
  const { resumeId } = useParams<{ resumeId: string; }>();
  const { getResume } = useGetResume();
  const showToastWithOptions = useToast();
  useEffect(() => {
    if (!resumeId) {
      showToastWithOptions({
        icon: 'error',
        content: '無効な履歴書IDです。',
      });
      return;
    }
  
    getResume(resumeId);

    return () => {
      // クリーンアップ時に履歴書データをリセット
      dispatch(resetResume());
    };
  }, [resumeId, getResume, dispatch, showToastWithOptions]);

  const [scale, setScale] = useState(1);
  const { ref, elHeight } = useElementRect<HTMLDivElement>();
  
  const fitScale = useCallback(() => {
    // A4 96dpiサイズ1123pxをparentHeightに合わせます（余白を差し引く）
    const scrollbarXHeight = ref.current ? Math.max(0, (ref.current.offsetWidth - ref.current.clientWidth)) : 0;
    const fittedScale = Math.max(1, (elHeight - 48 * 2 - scrollbarXHeight)) / 1123;

    setScale(fittedScale);
  }, [elHeight, ref]);

  useEffect(() => {
    fitScale();
  }, [fitScale]);

  const resumeRef = useRef<ResumeHandle>(null);
  const handleConvertToPdf = () => {
    return resumeRef.current ? resumeRef.current.convertToPdf() : Promise.resolve();
  };

  const resumeEditorRef = useRef<ResumeEditorHandle>(null);
  const handleResumeClick = (...args: Parameters<NonNullable<typeof resumeEditorRef.current>['open']>) => {
    resumeEditorRef.current?.open(...args);
  };
  const handleResumeNameClick = () => {
    resumeEditorRef.current?.open('resumeName');
  };
  const handleResumeBlankSpaceClick = () => {
    resumeEditorRef.current?.close();
  };

  return (
    <ResumePageWrapper ref={ ref }>
      <ResumePageContentScrollWrapper>        
        <ResumePageContentWrapper
          onClick={ handleResumeBlankSpaceClick }
        >
          <ResumeControls
            scale={ scale }
            resume={ resume }
            setScale={ setScale }
            fitScale={ fitScale }
            onConvertToPdf={ handleConvertToPdf }
            onResumeNameClick={ handleResumeNameClick }
          />
          
          <Resume
            ref={ resumeRef }
            scale={ scale }
            resume={ resume }
            onResumeClick={ handleResumeClick }
          />
        </ResumePageContentWrapper>
      </ResumePageContentScrollWrapper>

      <ResumeEditor
        ref={ resumeEditorRef }
        resume={ resume }
      />
    </ResumePageWrapper>
  );
};
