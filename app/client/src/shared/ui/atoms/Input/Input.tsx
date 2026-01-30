import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components'
import type { ColorKey } from '@/shared/styles/theme';

export const INPUT_STYLE_TYPES = [
  'default',
  'transparent',
] as const;
export type InputStyleTypes = typeof INPUT_STYLE_TYPES[number];

type Props = {
  styleType?: InputStyleTypes;
  outlineColor?: ColorKey;
} & ComponentPropsWithoutRef<'input'>;
const propsToStop = new Set([
  'styleType',
  'outlineColor',
]);

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => (
  <StyledInput
    ref={ ref }
    { ...props }
  />
));

const StyledInput = styled.input.withConfig({
    shouldForwardProp: (prop) => !propsToStop.has(prop),
  })<Props>`
  outline-color: ${ ({ theme, outlineColor = 'primary' }) => theme.color[outlineColor] };

  ${ ({ theme }) => {
    const { typography, spacing } = theme;
    const { fontSize, lineHeight, letterSpacing } = typography;

    return css`
      font-size: ${ fontSize.md.pc };
      letter-spacing: ${ letterSpacing.body.pc };
      line-height: ${ lineHeight.tight.pc };
      padding: ${ `${ spacing.xs.pc } ${ spacing.sm.pc }` };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        font-size: ${ fontSize.md.sp };
        letter-spacing: ${ letterSpacing.body.sp };
        line-height: ${ lineHeight.tight.sp };
        padding: ${ `${ spacing.xs.sp } ${ spacing.sm.sp }` };
      }
    `;
  }}

  ${ ({ styleType, outlineColor = 'primary' }) => {
    switch (styleType) {
      case 'transparent': {
        return css`
          border: none;
          border-radius: ${ ({ theme }) => theme.radius.none };
          outline: none;
          border-bottom: solid 1px ${ ({ theme }) => theme.color.paleGray };

          &:focus-visible {
            border-bottom: solid 2px ${ ({ theme }) => theme.color[outlineColor] };
          }
        `;
      }
      case 'default':
      default: {
        return css`
          border-radius: ${ ({ theme }) => theme.radius.md };
          border: solid 2px ${ ({ theme }) => theme.color.paleGray };
        `;
      }
    }
  } }
`;
