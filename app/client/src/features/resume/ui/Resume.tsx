import { forwardRef, useImperativeHandle, useRef } from "react";
import { ResumeWrapper, ResumePaper, ResumePaperScaler, GridItem, GridItemContent, ResumePaperBackground, GridItemColAdjuster } from "./Resume.styles"
import { formatResumeGridItems } from "./resume_grid_items_formatter";
import { convertToPdf } from "@/shared/utils/convert_to_pdf";
import type { ResumeObj } from "@/shared/api/types";
import { useAppDispatch } from "@/app/store/hooks";
import { updateLayouts } from "../model/resumeSlice";

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

  const resumeGridItemsListByPapers = formatResumeGridItems(resume);
  const paperRefsList = useRef<(HTMLDivElement | null)[]>([]);
  
  useImperativeHandle(ref, () => ({
    convertToPdf: async () => {
      await convertToPdf(
        paperRefsList.current
          .filter(r => r !== null)
          .filter((el): el is HTMLDivElement => el !== null),
        resume.name
      );
    },
  }));

  const adjusterDragStartRef = useRef<{ startX: number, startWidth: number } | null>(null);
  const dispatch = useAppDispatch();
  const dispatchLayoutUpdate = (newLayout: Partial<ResumeObj['layouts']>) => {
    dispatch(updateLayouts(newLayout));
  };

  return (
    <ResumeWrapper>
      {
        resumeGridItemsListByPapers.map((itemsList, listIndex) => (
          <ResumePaperScaler key={ listIndex } $scale={ scale }>
            <ResumePaperBackground>
              <ResumePaper ref={ (el) => { paperRefsList.current[listIndex] = el; } }>
                { itemsList.map((item, index) => {
                  const {
                    content,
                    innerContent,
                    innerContentConfig,
                    key,
                    propId,
                    entityKey,
                    adjustableOptions,
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

                      {
                        adjustableOptions?.colAdjustable && (
                          <GridItemColAdjuster
                            draggable
                            onClick={ e => e.stopPropagation() }
                            onDragStart={ (e) => {
                              // 要素自身の幅の分補正します
                              const cellWidth = 23.5 * scale;
                              adjusterDragStartRef.current = {
                                startX: Math.round(e.clientX + e.currentTarget.offsetWidth - cellWidth / 2),
                                startWidth: adjustableOptions.colAdjustable!.currentWidth,
                              };
                            }}
                            onDrag={ (e) => {
                              e.preventDefault();
                              if (!adjusterDragStartRef.current) return;

                              const { currentWidth, minWidth, maxWidth } = adjustableOptions.colAdjustable!;
                              const cellWidth = 23.5 * scale;
                              // 左右に動くごとに1カラム分の幅を調整します
                              const colChangeCount = Math.round((e.clientX - adjusterDragStartRef.current.startX) / cellWidth);
                              const newColWidth = adjusterDragStartRef.current.startWidth + colChangeCount;
                              // 最小・最大幅の制限を超えないように調整します
                              if (newColWidth !== currentWidth && newColWidth >= minWidth && newColWidth <= maxWidth) {
                                dispatchLayoutUpdate({
                                  [adjustableOptions.adjustKey]: {
                                    columnWidth: newColWidth,
                                  },
                                });
                              }
                            }}
                          />
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
