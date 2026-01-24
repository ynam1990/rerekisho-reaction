import { useEffect, useRef, useState } from "react";
import { useElementRect } from "@/shared/hooks/useElementRect";
import { ResumePageContentScrollWrapper, ResumePageContentWrapper, ResumePageWrapper } from "./ResumePage.styles"
import { Resume, ResumeControls, ResumeEditor, type ResumeEditorHandle, type ResumeHandle } from "@/features/resume";
import { type ResumeObj } from "@/features/resume/model/resume_mock";
import { useResumeSelector } from "@/app/store/hooks";

export const ResumePage = () => {
  const { resume } = useResumeSelector();

  const [scale, setScale] = useState(1);
  const { ref, elHeight } = useElementRect<HTMLDivElement>();
  
  const calcFitScale = () => {
    // A4 96dpiサイズ1123pxをparentHeightに合わせます（余白を差し引く）
    const scrollbarXHeight = ref.current ? Math.max(0, (ref.current.offsetWidth - ref.current.clientWidth)) : 0;
    const fitScale = Math.max(1, (elHeight - 48 * 2 - scrollbarXHeight)) / 1123;
    return fitScale;
  };

  const fitScale = () => setScale(calcFitScale());

  useEffect(() => {
    fitScale();
  }, [elHeight]);

  const resumeRef = useRef<ResumeHandle>(null);
  const handleConvertToPdf = () => {
    return resumeRef.current ? resumeRef.current.convertToPdf() : Promise.resolve();
  };

  const resumeEditorRef = useRef<ResumeEditorHandle>(null);
  const handleResumeClick = (key: keyof ResumeObj['values'], propId?: string, entityKey?: string) => {
    resumeEditorRef.current?.open(key, propId, entityKey);
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
