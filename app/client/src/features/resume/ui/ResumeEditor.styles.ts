import styled, { css } from 'styled-components';
import { boxShadow } from '@/shared/styles/mixins';
import { pickWhite } from '@/shared/utils/style';
import { Heading, Input, Label } from '@/shared/ui/atoms';

export const ResumeEditorWrapper = styled.div<{ $isOpen: boolean }>`
  position: relative;
  z-index: ${ ({ theme }) => theme.zIndex.resumeEditor };
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  height: calc(100dvh - var(--header-height) - var(--footer-height));
  --editor-width: 320px;
  width: ${ ({ $isOpen }) => $isOpen ? 'var(--editor-width)' : '0px' };
  max-width: 66%;
  flex-shrink: 0;
  transition: width 0.3s ease-in-out;
  background-color: ${ ({ theme }) => pickWhite(theme) };
  ${ boxShadow }
`;

export const ResumeEditorInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100%;
  width: var(--editor-width);
  max-width: 100%;

  ${ ({ theme }) => {
    return css`
      background-color: ${ theme.color.backgroundGray };
      z-index: ${ theme.zIndex.resumeEditor };

      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
      row-gap: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.sp } ${ theme.spacing.lg.sp };
        row-gap: ${ theme.spacing.lg.sp };
      } 
    `;
  } }
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
