import styled, { css } from 'styled-components';

export const ResumeListPageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${ ({ theme }) => {
    return css`
      padding: ${ theme.spacing.xxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ `${ theme.spacing.xxl.sp } ${ theme.spacing.lg.sp }` };
      }
    `;
  } }
`;
