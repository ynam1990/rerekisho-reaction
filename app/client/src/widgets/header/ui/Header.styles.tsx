import styled, { css } from 'styled-components'
import { Anchor, Heading } from '@/shared/ui/atoms';
import { pickWhite } from '@/shared/utils/style';
import { boxShadow, hideOnMin, postItStickLeft } from '@/shared/styles/mixins';

export const LogoWrapperAnchor = styled(Anchor)`
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

export const LogoImg = styled.img`
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

export const HeaderWrapper = styled.header`
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

export const HeaderRightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* フラッシュを避けるため、最初はopacityを0にしています */
  opacity: 0;
  animation: fadeIn 0.6s ease-in-out forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export const HamburgerMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  ${ boxShadow }
  ${ postItStickLeft }
  
  ${ ({ theme }) => {
    return css`
      background-color: ${ pickWhite(theme) };
      padding: ${ theme.spacing.md.pc } ${ theme.spacing.sm.pc };
      row-gap: ${ theme.spacing.md.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.md.pc } ${ theme.spacing.sm.pc };
        row-gap: ${ theme.spacing.md.sp };
      }
    `;
  } }
`;
