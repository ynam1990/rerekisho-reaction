import type { theme, WithTheme } from '@/shared/styles/theme';
import type { ColorKey } from '@/shared/styles/theme';
import { pickMainSubColors } from '@/shared/utils/style';
import styled, { css, type Interpolation } from 'styled-components'

export const BUTTON_TYPES = [
  'solid',
  'outline',
] as const;
export type ButtonTypes = typeof BUTTON_TYPES[number];

type Props = {
  styleType?: ButtonTypes;
  color?: ColorKey;
  size?: keyof typeof theme.typography.fontSize;
  noWrap?: boolean;
};
type PropsWithTheme = WithTheme<Props>;
const propsToStop = new Set([
  'styleType',
  'noWrap',
]);

const mediaQueryStyle = ({ theme, size = 'md' }: PropsWithTheme): Interpolation<Props> => {
  const fontSize = theme.typography.fontSize[size];
  const letterSpacingBody = theme.typography.letterSpacing.body;
  const lineHeight = theme.typography.lineHeight;
  const spacing = theme.spacing;
  
  return css`
    font-size: ${ fontSize.pc };
    letter-spacing: ${ letterSpacingBody.pc };
    line-height: ${ lineHeight.tight.pc };
    padding: ${ `${ spacing.md.pc } ${ spacing.lg.pc }` };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ fontSize.sp };
      letter-spacing: ${ letterSpacingBody.sp };
      line-height: ${ lineHeight.tight.sp };
      padding: ${ `${ spacing.md.sp } ${ spacing.lg.sp }` };
    }
  `;
};

export const Button = styled.button.withConfig({
    shouldForwardProp: (prop) => !propsToStop.has(prop),
  })<Props>`
  text-align: center;
  font-weight: bold;
  border-radius: ${ ({ theme }) => theme.radius.md };
  cursor: pointer;

  ${ ({ noWrap }) => noWrap && css`white-space: nowrap;` }

  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease,
    background-color 0.15s ease;
  
  &:active {
    opacity: ${ ({ theme }) => theme.opacity.active };
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${ ({ theme }) => theme.opacity.disabled };
  }

  ${ mediaQueryStyle }

  ${ ({ theme, styleType = 'solid', color = 'primary' }) => {
    const { mainColor, subColor } = pickMainSubColors(theme, color);

    switch (styleType) {
      case 'outline': {
        return css`
          color: ${ mainColor };
          background-color: ${ subColor };
          box-shadow: inset 0 0 0 2px ${ mainColor };

          &:hover, &:focus-visible {
            color: ${ subColor };
            background-color: ${ mainColor };
            box-shadow: inset 0 0 0 2px ${ subColor };
          }
        `;
      }
      case 'solid':
      default: {
        return css`
          color: ${ subColor };
          background-color: ${ mainColor };
          
          &:hover, &:focus-visible {
            color: ${ mainColor };
            background-color: ${ subColor };
            box-shadow: inset 0 0 0 2px ${ mainColor };
          }
        `;
      }
    }
  } }
`;
