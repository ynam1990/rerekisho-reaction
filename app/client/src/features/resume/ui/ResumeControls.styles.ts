import styled, { css } from 'styled-components';
import { boxShadow } from '@/shared/styles/mixins';
import { pickWhite } from '@/shared/utils/style';
import { Heading } from '@/shared/ui/atoms';

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
  ` }
`;

export const ResumeNameWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

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
  cursor: ${ props => (props.$clickable ? 'pointer' : 'default') };
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

export const ButtonIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  &> img {
    height: 100%;
    object-fit: contain;
  }

  ${ ({ theme }) => {
    return css`
      height: ${ theme.typography.fontSize.xxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        height: ${ theme.typography.fontSize.xxl.sp };
      }
    `;
  } }
`;
