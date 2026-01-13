import { Heading } from '@/shared/ui/atoms/Heading';
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
  max-width: min(180px, 80%);
`;

export const ColoredHeading = styled(Heading)`
  color: ${ ({ theme }) => theme.color.primary};
`;
