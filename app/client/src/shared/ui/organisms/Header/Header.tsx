import styled, { css } from 'styled-components'
import logoImg from '@/shared/assets/logos/logo.png'
import logoTextImg from '@/shared/assets/logos/logo_text.gif'
import { Button } from '@/shared/ui/atoms/Button';
import { Anchor } from '@/shared/ui/atoms/Anchor';

type Props = {
  isAuthenticated: boolean;
};

const LogoWrapperAnchor = styled(Anchor)`
  display: inline-flex;
  justify-content: left;
  align-items: center;
  margin-right: auto;
  
  cursor: pointer;
  * {
    pointer-events: none;
    user-select: none;
  }

  ${ ({ theme }) => css`
    column-gap: ${ theme.spacing.xs.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      column-gap: ${ theme.spacing.xxs.sp };
    }
  ` }
`;

const LogoImg = styled.img`
  ${ ({ theme }) => css`
    max-height: 46px;

    @media (max-width: ${ theme.breakpoints.sp}) {
      max-height: 38px;
    }
  ` }
`;

const LogoTextImg = styled.img`
  ${ ({ theme }) => css`
    max-height: 36px;

    @media (max-width: ${ theme.breakpoints.sp}) {
      max-height: 30px;
    }

    @media (max-width: ${ theme.breakpoints.min}) {
      display: none;
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
      background-color: ${ color.primary };
      padding: ${ `${ spacing.sm.pc } ${ spacing.lg.pc }` };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ `${ spacing.sm.sp } ${ spacing.lg.sp }` };
      }
    `;
  } };
`

export const Header = (props: Props) => (
  <HeaderWrapper>
    <LogoWrapperAnchor href='/'>
      <LogoImg src={ logoImg } alt="ロゴ画像はAI生成です" />
      <LogoTextImg src={ logoTextImg } alt="ロゴテキストのアニメーションGIFです" />
    </LogoWrapperAnchor>

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
