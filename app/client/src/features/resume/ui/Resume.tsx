import { forwardRef, useImperativeHandle, useRef } from "react";
import { ResumeWrapper, ResumePaper, ResumePaperScaler, GridItem, GridItemContent } from "./Resume.styles"
import { formatResumeGridItems } from "./resume_grid_items_formatter";
import { resume } from "../model/resume_mock";
import { convertToPdf } from "@/shared/utils/convert_to_pdf";

type Props = {
  scale: number;
};

export type ResumeHandle = {
  convertToPdf: () => Promise<void>;
};

export const Resume = forwardRef<ResumeHandle, Props>((props, ref) => {
  const { scale } = props;

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
            <ResumePaper ref={ paperRefs[listIndex] }>
              { list.map((item, index) => {
                const { content, innerContent, innerContentConfig, ...rest } = item;

                return (
                  <GridItem key={ index } { ...rest }>
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
          </ResumePaperScaler>
        ))
      }
    </ResumeWrapper>
  );
});
