import styled, { css } from 'styled-components';
import { boxShadow } from '@/shared/styles/mixins';
import { pickWhite } from '@/shared/utils/style';

export const ResumeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.lg.pc };
      padding-right: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.lg.sp };
      }
    `;
  } }
`;

export const ResumePaperScaler = styled.div<{ $scale: number }>`
  transform-origin: top left;
  transform: ${ props => `scale(${ props.$scale })` };
  width: ${ props => `${ 794 * props.$scale }px` };
  height: ${ props => `${ 1123 * props.$scale }px` };
  overflow: visible;
`;

export const ResumePaper = styled.div`
  /* A4 96dpiサイズ */
  width: 794px;
  height: 1123px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${ boxShadow }
  
  ${ ({ theme }) => {
    return css`
      background-color: ${ pickWhite(theme) };

      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
      row-gap: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
        row-gap: ${ theme.spacing.lg.sp };
      }
    `;
  } }
`;
