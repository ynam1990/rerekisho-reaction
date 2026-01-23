import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ResumeControlsWrapper, ResumeNameWrapper, PublishedImg, ResumeName, StyledHeading, ButtonIcon } from "./ResumeControls.styles";
import { Text } from "@/shared/ui/atoms";
import { ButtonGroup } from "@/shared/ui/molecules";
import publishedImg from '@/shared/assets/icons/icon_published.png';
import zoomInImg from '@/shared/assets/icons/icon_zoom_in.png';
import zoomOutImg from '@/shared/assets/icons/icon_zoom_out.png';
import zoomFitImg from '@/shared/assets/icons/icon_zoom_fit.png';
import zoomResetImg from '@/shared/assets/icons/icon_zoom_reset.png';
import controlsMoveImg from '@/shared/assets/icons/icon_controls_move.png';
import type { ResumeObj } from "../model/resume_mock";

type Props = {
  scale: number;
  resume: ResumeObj;
  setScale: (scale: number) => void;
  fitScale: () => void;
  onConvertToPdf: () => void;
};

export const ResumeControls = (props: Props) => {
  const { scale, resume, setScale, fitScale, onConvertToPdf } = props;

  const [isWarped, setIsWarped] = useState(false);

  const navigate = useNavigate();

  return (
    <ResumeControlsWrapper
      $isWarped={ isWarped }
      onClick={ (e) => e.stopPropagation() }
    >
      <ResumeNameWrapper>
        <ResumeName>
          <StyledHeading size="lg">
            { resume.name }
          </StyledHeading>

          { resume.isPublished && <PublishedImg src={ publishedImg } alt="アイコンはAI生成です" /> }
        </ResumeName>
        <Text size="sm">
          { `最終更新: ${ resume.updatedAt && dayjs(resume.updatedAt).format('YYYY年MM月DD日 hh時mm分') }` }
        </Text>
      </ResumeNameWrapper>

      <ButtonGroup
        $size="md"
        buttonPropsList={ [
          {
            styleType: 'solid',
            color: 'primary',
            size: 'md',
            children: '保存',
            onClick: () => {
              // 保存処理
            },
          },
          {
            styleType: 'solid',
            color: 'secondary',
            size: 'md',
            children: 'PDF',
            onClick: () => {
              onConvertToPdf();
            },
          },
          {
            styleType: 'solid',
            color: 'danger',
            size: 'md',
            children: '削除',
            onClick: () => {
              // 削除処理
            },
          },
        ] }
      />

      <ButtonGroup
        $size="sm"
        buttonPropsList={ [
          {
            styleType: 'icon',
            children: (
              <ButtonIcon>
                <img src={ controlsMoveImg } alt="アイコンはAI生成です" />
              </ButtonIcon>
            ),
            onClick: () => {
              setIsWarped(!isWarped);
            },
          },
          {
            styleType: 'icon',
            children: (
              <ButtonIcon>
                <img src={ zoomResetImg } alt="アイコンはAI生成です" />
              </ButtonIcon>
            ),
            onClick: () => {
              setScale(1);
            },
          },
          {
            styleType: 'icon',
            children: (
            <ButtonIcon>
              <img src={ zoomFitImg } alt="アイコンはAI生成です" />
            </ButtonIcon>
            ),
            onClick: () => {
              fitScale();
            },
          },
          {
            styleType: 'icon',
            children: (
              <ButtonIcon>
                <img src={ zoomOutImg } alt="アイコンはAI生成です" />
              </ButtonIcon>
            ),
            onClick: () => {
              setScale(Math.max(0.1, scale - 0.1));
            },
          },
          {
            styleType: 'icon',
            children: (
              <ButtonIcon>
                <img src={ zoomInImg } alt="アイコンはAI生成です" />
              </ButtonIcon>
            ),
            onClick: () => {
              setScale(Math.min(2, scale + 0.1));
            },
          },
        ] }
      />

    </ResumeControlsWrapper>
  );
};
