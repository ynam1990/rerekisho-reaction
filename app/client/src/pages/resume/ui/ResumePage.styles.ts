import styled, { css } from 'styled-components';

export const ResumePageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  
  /* スクロールバーを内側に配置するため、JSで計算してheightを設定します */
  /* flex: 1; */
  width: 100%;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  height: calc(100dvh - var(--header-height) - var(--footer-height));
  overflow-x: scroll;
  overflow-y: scroll;
  
  ${ ({ theme }) => {
    return css`
      padding: ${ theme.spacing.xxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ `${ theme.spacing.xxl.sp } ${ theme.spacing.lg.sp }` };
      }
    `;
  } }
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
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        row-gap: ${ theme.spacing.lg.sp };
      }
    `;
  } }
`;
