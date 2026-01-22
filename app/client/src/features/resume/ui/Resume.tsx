import { ResumeWrapper, ResumePaper, ResumePaperScaler, GridItem, GridItemContent } from "./Resume.styles"
import { formatResumeGridItems } from "./resume_grid_items_formatter";
import { resume } from "../model/resume_mock";

type Props = {
  scale: number;
};

export const Resume = (props: Props) => {
  const { scale } = props;

  return (
    <ResumeWrapper>
      {
        formatResumeGridItems(resume).map((list, listIndex) => (
          <ResumePaperScaler key={ listIndex } $scale={ scale }>
            <ResumePaper>
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
};
