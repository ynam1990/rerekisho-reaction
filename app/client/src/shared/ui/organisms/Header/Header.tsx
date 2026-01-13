import styled, { css } from 'styled-components'
import logoImg from '@/shared/assets/logos/logo.png'
import { Button } from '@/shared/ui/atoms/Button';

type Props = {
  isAuthenticated: boolean;
};

const LogoImg = styled.img`
  margin-right: auto;
  max-height: 48px;
  
  ${ ({ theme }) => css`
    @media (max-width: ${ theme.breakpoints.sp}) {
      max-height: 42px;
    }
  ` }
`;


const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;

  ${ ({ theme }) => {
    const { color, spacing } = theme;

    return css`
      background-color: ${ color.secondary };
      padding: ${ `${ spacing.sm.pc } ${ spacing.lg.pc }` };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ `${ spacing.sm.sp } ${ spacing.lg.sp }` };
      }
    `;
  } };
`

export const Header = (props: Props) => (
  <HeaderWrapper>
    <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />

    <>
      {
        props.isAuthenticated ? (
          <div></div>
        ) : (
          <Button type='outline' color='primary'>
            ログイン
          </Button>
        )
      }
    </>
  </HeaderWrapper>
);
