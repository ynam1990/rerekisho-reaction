import styled, { css } from 'styled-components'
import logoImg from '@/shared/assets/logos/logo.png'
import { Button } from '@/shared/ui/atoms/Button';
import { Anchor } from '@/shared/ui/atoms/Anchor';
import { Heading } from '@/shared/ui/atoms/Heading';
import { pickWhite } from '@/shared/utils/style';
import { boxShadow, hideOnMin } from '@/shared/styles/mixins';

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
    column-gap: ${ theme.spacing.sm.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      column-gap: ${ theme.spacing.xs.sp };
    }
  ` }
`;

const LogoImg = styled.img`
  max-height: 100%;
  aspect-ratio: 579 / 640;

  ${ ({ theme }) => css`
    height: 46px;

    @media (max-width: ${ theme.breakpoints.sp}) {
      height: 38px;
    }
  ` }
`;

export const ColoredHeading = styled(Heading)`
  font-weight: normal;
  color: ${ ({ theme }) => pickWhite(theme) };

  ${ hideOnMin }

  transform: translateY(2px);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: right;
  ${ boxShadow };

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
      <ColoredHeading size="xxxl">Rerekishon</ColoredHeading>
    </LogoWrapperAnchor>

    <>
      {
        props.isAuthenticated ? (
          <div></div>
        ) : (
          <Button
            styleType='outline'
            color='primary'
            noWrap={ true }
            onClick={ () => {
              window.location.href = '/auth/signin';
            }}
          >
            ログイン
          </Button>
        )
      }
    </>
  </HeaderWrapper>
);
