import styled, { css } from 'styled-components'
import { Text, Anchor } from '@/shared/ui/atoms'
import { pickWhite } from '@/shared/utils/style';
import { boxShadowTop } from '@/shared/styles/mixins';

const FooterWrapper = styled.footer`
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
`

export const Footer = () => (
  <FooterWrapper>
    <Text size='sm'>© { new Date().getFullYear() } Rerekishon</Text>
    <Text size='sm'>/</Text>
    <Text size='sm'>
      <Anchor href='https://github.com/ynam1990/RerekishoReaction'>githubリポジトリ</Anchor>
    </Text>
  </FooterWrapper>
);
