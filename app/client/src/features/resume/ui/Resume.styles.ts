import styled, { css } from 'styled-components';
import { boxShadow } from '@/shared/styles/mixins';
import { isUndefined } from '@/shared/utils/check';
import { pickWhite } from '@/shared/utils/style';

export const ResumeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.lg.pc };
      
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

export const ResumePaperBackground = styled.div`
  background-color: ${ ({ theme }) => pickWhite(theme) };
  width: fit-content;
  height: fit-content;
`;

export const ResumePaper = styled.div`
  position: relative;
  ${ boxShadow }

  /* A4 96dpiサイズ */
  width: 794px;
  height: 1123px;
  padding: 21px;

  /* 744pxを16分割するGrid */
  display: grid;
  grid-template-columns: repeat(32, 1fr);
  grid-template-rows: repeat(46, 1fr);
  place-items: stretch;

  color: ${ ({ theme }) => theme.color.inkBlack };
  background-color: transparent;
  
  /* print時のスタイル */
  @media print {
    box-shadow: none;
    background-color: #fff;
    -webkit-print-color-adjust: exact;
  }
`;

export type GridItemConfig = {
  $cols: [number, number];
  $rows: [number, number];
  $fontSize?: number;
  $letterSpacing?: number;
  $noWrap?: boolean;
  $justifyContent?: 'start' | 'center' | 'end';
  $alignItems?: 'start' | 'center' | 'end';
  $borders?: {
    top?: boolean | 'thin' | 'double';
    bottom?: boolean | 'thin' | 'double';
    left?: boolean | 'thin' | 'double';
    right?: boolean | 'thin' | 'double';
  };
  $paddings?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };
};

export const GridItem = styled.div<GridItemConfig>`
  ${ (props) => {
    return css`
      grid-column-start: ${ props.$cols[0] };
      grid-column-end: ${ props.$cols[1] };
      grid-row-start: ${ props.$rows[0] };
      grid-row-end: ${ props.$rows[1] };
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: ${ props.$noWrap ? 'nowrap' : 'pre-wrap' };
      word-break: break-all;

      display: flex;
      justify-content: ${ props.$justifyContent || 'start' };
      align-items: ${ props.$alignItems || 'center' };

      padding-top: ${ !isUndefined(props.$paddings?.top) ? `${ props.$paddings.top }px` : '2px' };
      padding-bottom: ${ !isUndefined(props.$paddings?.bottom) ? `${ props.$paddings.bottom }px` : '2px' };
      padding-right: ${ !isUndefined(props.$paddings?.right) ? `${ props.$paddings.right }px` : '4px' };
      padding-left: ${ !isUndefined(props.$paddings?.left) ? `${ props.$paddings.left }px` : '4px' };

      /* PC・モバイルの区別なく常に一定のスタイル */
      font-size: ${ props.$fontSize ? `${ props.$fontSize }px` : '12px' };
      letter-spacing: ${ props.$letterSpacing ? `${ props.$letterSpacing }px` : '2px' };
      line-height: ${ props.theme.typography.lineHeight.none.pc };
    
      border: none;
      border-width: 2px;
      border-color: ${ props.theme.color.inkBlack };
      border-top-style: ${ props.$borders?.top ? 'solid' : 'none' };
      border-top-width: ${ props.$borders?.top === 'thin' ? '1px' : '2px' };
      ${ props.$borders?.top === 'double' && css`
        border-top-width: 1px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 1px;
          height: 1px;
          width: 100%;
          pointer-events: none;
          background-color: ${ props.theme.color.inkBlack };
        }
      ` }
      border-bottom-style: ${ props.$borders?.bottom ? 'solid' : 'none' };
      border-bottom-width: ${ props.$borders?.bottom === 'thin' ? '1px' : '2px' };
      ${ props.$borders?.bottom === 'double' && css`
        border-bottom-width: 1px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 1px;
          height: 1px;
          width: 100%;
          pointer-events: none;
          background-color: ${ props.theme.color.inkBlack };
        }
      ` }
      border-left-style: ${ props.$borders?.left ? 'solid' : 'none' };
      border-left-width: ${ props.$borders?.left === 'thin' ? '1px' : '2px' };
      ${ props.$borders?.left === 'double' && css`
        border-left-width: 1px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 1px;
          width: 1px;
          height: 100%;
          pointer-events: none;
          background-color: ${ props.theme.color.inkBlack };
        }
      ` }
      border-right-style: ${ props.$borders?.right ? 'solid' : 'none' };
      border-right-width: ${ props.$borders?.right === 'thin' ? '1px' : '2px' };
      ${ props.$borders?.right === 'double' && css`
        border-right-width: 1px;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          right: 1px;
          width: 1px;
          height: 100%;
          pointer-events: none;
          background-color: ${ props.theme.color.inkBlack };
        }
      ` }
    `;
  } }
`;

export type GridItemContentConfig = {
  $fontSize?: number;
  $letterSpacing?: number;
  $lineHeight?: number;
  $noWrap?: boolean;
  $paddings?: {
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
  };
  $justifyContent?: 'start' | 'center' | 'end';
  $alignItems?: 'start' | 'center' | 'end';
};

export const GridItemContent = styled.div<GridItemContentConfig>`
  flex: 1;
  display: inline-flex;
  justify-content: ${ props => props.$justifyContent || 'start' };
  align-items: ${ props => props.$alignItems || 'center' };

  white-space: ${ props => props.$noWrap ? 'nowrap' : 'pre-wrap' };
  font-size: ${ props => props.$fontSize ? `${props.$fontSize}px` : '16px' };
  letter-spacing: ${ props => props.$letterSpacing ? `${props.$letterSpacing}px` : '2px' };
  line-height: ${ props => props.$lineHeight ? `${props.$lineHeight}px` : props.theme.typography.lineHeight.none.pc };

  padding-top: ${ props => isUndefined(props.$paddings?.top) ? '0' : `${props.$paddings.top}px` };
  padding-bottom: ${ props => isUndefined(props.$paddings?.bottom) ? '0' : `${props.$paddings.bottom}px` };
  padding-right: ${ props => isUndefined(props.$paddings?.right) ? '0' : `${props.$paddings.right}px` };
  padding-left: ${ props => isUndefined(props.$paddings?.left) ? '0' : `${props.$paddings.left}px` };
`;

export const ResumePhotoImg = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

export const ResumeEmailContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  white-space: pre-wrap;
  font-size: 12px;
  letter-spacing: 2px;
  line-height: ${ ({ theme }) => theme.typography.lineHeight.none.pc };
  
  &> div {
    display: inline-flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
  

    &:first-child {
      height: 23.5px;
    }

    &:last-child {
      height: 100%;
      font-size: 16px;
    }
  }
`;
