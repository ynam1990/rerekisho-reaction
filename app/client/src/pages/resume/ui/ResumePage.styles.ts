import styled, { css } from 'styled-components';

export const ResumePageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ResumePageContentScrollWrapper = styled.div`
  width: 100%;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  height: calc(100dvh - var(--header-height) - var(--footer-height));
  overflow-x: scroll;
  overflow-y: scroll;
`;

export const ResumePageContentWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ${ ({ theme }) => {
    return css`
      row-gap: ${ theme.spacing.lg.pc };
      padding: ${ theme.spacing.xxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        row-gap: ${ theme.spacing.lg.sp };
        padding: ${ `${ theme.spacing.xxl.sp } ${ theme.spacing.lg.sp }` };
      }
    `;
  } }
`;
