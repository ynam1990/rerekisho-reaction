import styled, { css } from 'styled-components'
import { pickWhite } from '@/shared/utils/style';
import { boxShadowTop } from '@/shared/styles/mixins';

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  ${ boxShadowTop }
  
  ${ ({ theme }) => {
    const { color, spacing } = theme;
    
    return css`
      background-color: ${ color.tertiary };
      color: ${ pickWhite(theme) };
      padding: ${ `${ spacing.xxs.pc }` };
      min-height: ${ spacing.lg.pc };
      column-gap: ${ spacing.xxs.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ `${ spacing.xxs.sp }` };
        min-height: ${ spacing.lg.sp };
        column-gap: ${ spacing.xxs.sp };
      }
    `;
  } };
`;
