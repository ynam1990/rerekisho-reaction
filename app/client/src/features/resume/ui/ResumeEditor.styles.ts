import styled, { css } from 'styled-components';
import { boxShadow } from '@/shared/styles/mixins';
import { pickWhite } from '@/shared/utils/style';
import { Heading, Input, Label } from '@/shared/ui/atoms';

export const ResumeEditorWrapper = styled.div<{
  $isOpen: boolean;
  $editorWidth: number;
  $isDragging: boolean;
}>`
  position: relative;
  z-index: ${ ({ theme }) => theme.zIndex.resumeEditor };
  overflow-y: scroll;
  overflow-x: auto;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  height: calc(100dvh - var(--header-height) - var(--footer-height));
  --editor-width: ${ ({ $editorWidth }) => `${ Math.max(($editorWidth || 320), 120) }px` };
  width: ${ ({ $isOpen }) => $isOpen ? 'var(--editor-width)' : '0px' };
  max-width: 100%;
  flex-shrink: 0;
  background-color: ${ ({ theme }) => pickWhite(theme) };
  transition: ${ ({ $isDragging }) => $isDragging ? 'none' : 'width 0.3s ease-in-out' };
  ${ boxShadow }
`;

export const ResumeEditorInnerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100%;
  width: calc(var(--editor-width) - var(--scrollbar-width));

  ${ ({ theme }) => {
    return css`
      background-color: ${ theme.color.backgroundGray };
      z-index: ${ theme.zIndex.resumeEditor };
      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.sp } ${ theme.spacing.lg.sp };
      } 
    `;
  } }
`;

export const ResumeEditorWidthAdjuster = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 12px;
  height: 100%;
  cursor: ew-resize;
  z-index: ${ ({ theme }) => theme.zIndex.resumeEditor + 1 };

  --adjuster-opacity: 1;
  &:active {
    --adjuster-opacity: ${ ({ theme }) => theme.opacity.active };
  }
  &:hover, &:active {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 2px;
      width: 1px;
      height: 100%;
      background-color: ${ ({ theme }) => theme.color.borderGray };
      opacity: var(--adjuster-opacity);
      pointer-events: none;
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 4px;
      width: 1px;
      height: 100%;
      background-color: ${ ({ theme }) => theme.color.borderGray };
      opacity: var(--adjuster-opacity);
      pointer-events: none;
    }
  }
`;

export const ResumeEditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export const ResumeEditorBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;

  ${ ({ theme }) => {
    return css`
      row-gap: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        row-gap: ${ theme.spacing.lg.sp };
      } 
    `;
  } }
`;

export const EditorRow = styled.div<{
  $direction?: 'row' | 'column';
  $justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}>`
  display: flex;
  flex-direction: ${ ({ $direction }) => $direction || 'column' };
  align-items: ${ ({ $direction }) => $direction === 'row' ? 'flex-end' : 'flex-start' };
  justify-content: ${ ({ $justifyContent }) => $justifyContent || 'flex-start' };
  width: 100%;

  ${ ({ theme }) => {
    return css`
      row-gap: ${ theme.spacing.sm.pc };
      column-gap: ${ theme.spacing.sm.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        row-gap: ${ theme.spacing.sm.sp };
        column-gap: ${ theme.spacing.sm.sp };
      } 
    `;
  } }
`;

export const EditorRowInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const EditorRowInner = styled.div<{
  $justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}>`
  display: flex;
  align-items: center;
  justify-content: ${ ({ $justifyContent }) => $justifyContent || 'flex-start' };
  width: 100%;

  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.sm.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.sm.sp };
      } 
    `;
  } }
`;

export const StyledLabel = styled(Label)`
  width: 100%;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  background-color: ${ ({ theme }) => pickWhite(theme) };
  color: ${ ({ theme }) => theme.color.inkBlack };
`;

export const StyledHeading = styled(Heading)`
  color: ${ ({ theme }) => theme.color.tertiary };
`;

export const DraggableDotsIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  &> img {
    height: 100%;
    object-fit: contain;
    pointer-events: none;
  }

  &:hover {
    opacity: ${ ({ theme }) => theme.opacity.hover };
  }
  &:active {
    opacity: ${ ({ theme }) => theme.opacity.active };
  }

  ${ ({ theme }) => {
    return css`
      height: ${ theme.typography.fontSize.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        height: ${ theme.typography.fontSize.lg.sp };
      }
    `;
  } }
`;

