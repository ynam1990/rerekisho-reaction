import { forwardRef, useImperativeHandle, useRef } from "react";
import { ResumeWrapper, ResumePaper, ResumePaperScaler, GridItem, GridItemContent, ResumePaperBackground } from "./Resume.styles"
import { formatResumeGridItems } from "./resume_grid_items_formatter";
import { convertToPdf } from "@/shared/utils/convert_to_pdf";
import type { ResumeObj } from "@/shared/api/types";

type Props = {
  scale: number;
  resume: ResumeObj;
  onResumeClick: (key: keyof ResumeObj['values'], propId?: string, entityKey?: string) => void;
};

export type ResumeHandle = {
  convertToPdf: () => Promise<void>;
};

export const Resume = forwardRef<ResumeHandle, Props>((props, ref) => {
  const { scale, resume, onResumeClick } = props;

  const paperRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useImperativeHandle(ref, () => ({
    convertToPdf: async () => {
      await convertToPdf(
        paperRefs.map(r => r.current!)
          .filter((el): el is HTMLDivElement => el !== null),
        resume.name
      );
    },
  }));

  return (
    <ResumeWrapper>
      {
        formatResumeGridItems(resume).map((list, listIndex) => (
          <ResumePaperScaler key={ listIndex } $scale={ scale }>
            <ResumePaperBackground>
              <ResumePaper ref={ paperRefs[listIndex] }>
                { list.map((item, index) => {
                  const {
                    content,
                    innerContent,
                    innerContentConfig,
                    key,
                    propId,
                    entityKey,
                    ...rest
                  } = item;

                  return (
                    <GridItem
                      key={ index }
                      { ...rest }
                      onClick={ key && ((e) => {
                        e.stopPropagation();
                        onResumeClick(key, propId, entityKey);
                      }) }
                    >
                      { content }

                      {
                        innerContent && (
                          <GridItemContent { ...innerContentConfig }>{ innerContent }</GridItemContent>
                        )
                      }
                    </GridItem>
                  );
                }) }
              </ResumePaper>
            </ResumePaperBackground>
          </ResumePaperScaler>
        ))
      }
    </ResumeWrapper>
  );
});
