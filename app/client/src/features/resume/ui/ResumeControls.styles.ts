import styled, { css } from 'styled-components';
import { boxShadow } from '@/shared/styles/mixins';
import { pickWhite } from '@/shared/utils/style';
import { Heading, Text } from '@/shared/ui/atoms';
import { ButtonGroup } from '@/shared/ui/molecules';

export const ResumeControlsWrapper = styled.div<{ $isWarped: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${ boxShadow }
  
  ${ ({ theme }) => {
    return css`
      background-color: ${ pickWhite(theme) };

      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
      column-gap: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
        row-gap: ${ theme.spacing.lg.sp };
        flex-direction: column;
        align-items: flex-start;
      }
    `;
  } }

  ${ ({ $isWarped, theme }) => $isWarped && css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${ theme.zIndex.resumeControls };
    /* Hamburgerアイコンの幅と余白分を考慮します */
    max-width: calc(100% - 44px - ${ theme.spacing.lg.pc } * 2);
    padding: ${ theme.spacing.md.pc } ${ theme.spacing.lg.pc };

    @media (max-width: ${ theme.breakpoints.sp}) {
      max-width: calc(100% - 44px - ${ theme.spacing.lg.sp } * 2);
      /* ヘッダーの高さと合わせるため、例外的にpx指定しています */
      padding: 13.5px ${ theme.spacing.lg.sp };
    }
  ` }
`;

export const ResumeNameWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 1;
  max-width: 100%;

  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.sm.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.sm.sp };
      }
    `;
  } }
`;

export const ResumeNameInnerWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 100%;

  ${ ({ theme }) => {
    return css`
      row-gap: ${ theme.spacing.xxs.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        row-gap: ${ theme.spacing.xxs.sp };
      }
    `;
  } }
`;

export const ResumeName = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  line-height: ${ ({ theme }) => theme.typography.lineHeight.none.pc };

  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.xxs.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.xxs.sp };
      }
    `;
  } }
`;

export const StyledHeading = styled(Heading)<{ $clickable?: boolean }>`
  font-weight: normal;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: ${ props => (props.$clickable ? 'pointer' : 'default') };
`;

export const ResumeUpdatedAtText = styled(Text)`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PublishedImg = styled.img`
  ${ ({ theme }) => {
    return css`
      height: ${ theme.typography.fontSize.xxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        height: ${ theme.typography.fontSize.xxl.sp };
      }
    `;
  } }
`;

export const StyledButtonGroup = styled(ButtonGroup)<{ $hideWhenSP?: boolean }>`
  flex-shrink: 0;
  
  ${ ({ $hideWhenSP, theme }) => $hideWhenSP && css`
    @media (max-width: ${ theme.breakpoints.sp }) {
      display: none;
    }
  ` }
`;

const ROTATE_DEGREE_MAP = {
  left: 270,
  right: 90,
  up: 0,
  down: 180,
} as const;
export const ButtonIcon = styled.div<{
  $size?: 'md' | 'xxl';
  $direction?: keyof typeof ROTATE_DEGREE_MAP;
  $hideWhenPC?: boolean;
}>`
  /* display: inline-flex; */
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  &> img {
    height: 100%;
    object-fit: contain;
  }

  ${ ({ theme, $direction, $size, $hideWhenPC }) => {
    
    return css`
      height: ${ theme.typography.fontSize[$size ?? 'xxl'].pc };
      display: ${ $hideWhenPC ? 'none' : 'inline-flex' };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        height: ${ theme.typography.fontSize[$size ?? 'xxl'].sp };
        display: inline-flex;
      }

      transition: transform 0.3s ease;
      transform: ${ $direction ? `rotate(${ ROTATE_DEGREE_MAP[$direction] }deg)` : 'none' };
    `;
  } }
`;
