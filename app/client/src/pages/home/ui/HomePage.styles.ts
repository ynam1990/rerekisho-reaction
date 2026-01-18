import styled, { css } from 'styled-components';

export const HomePageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
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

export const LogoImg = styled.img`
  width: min(180px, 80%);
  aspect-ratio: 579 / 640;
`;

export const LogoTextImg = styled.img`
  ${ ({ theme }) => css`
    height: 76px;

    @media (max-width: ${ theme.breakpoints.sp}) {
      height: 72px;
    }
    
  ` }
`;
