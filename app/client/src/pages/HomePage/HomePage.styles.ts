import styled, { css } from 'styled-components';

export const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${ ({ theme }) => {
    return css`
    row-gap: ${ theme.spacing.lg.pc };
    padding: ${ theme.spacing.lg.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ theme.spacing.lg.sp };
      line-height: ${ theme.spacing.lg.sp };
    }
  `;
  } }
`;

export const LogoImg = styled.img`
  width: 80%;
  max-width: 180px;
`;
