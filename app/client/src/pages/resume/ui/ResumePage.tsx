import { useEffect, useRef, useState } from "react";
import { useElementRect } from "@/shared/hooks/useElementRect";
import { ResumePageContentWrapper, ResumePageWrapper } from "./ResumePage.styles"
import { Resume, ResumeControls, type ResumeHandle } from "@/features/resume";

export const ResumePage = () => {
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
    resumeRef.current?.convertToPdf();
  };
  
  return (
    <ResumePageWrapper ref={ ref }>
      <ResumePageContentWrapper>
        <ResumeControls
          scale={ scale }
          setScale={ setScale }
          fitScale={ fitScale }
          onConvertToPdf={ handleConvertToPdf }
        />
        
        <Resume ref={ resumeRef } scale={ scale } />
      </ResumePageContentWrapper>
    </ResumePageWrapper>
  );
};
