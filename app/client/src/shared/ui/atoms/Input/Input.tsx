import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components'

export const INPUT_STYLE_TYPES = [
  'default',
  'transparent',
] as const;
export type InputStyleTypes = typeof INPUT_STYLE_TYPES[number];

type Props = {
  $type?: InputStyleTypes;
} & ComponentPropsWithoutRef<'input'>;


const StyledInput = styled.input<Props>`
  outline-color: ${ ({ theme }) => theme.color.primary };

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

  ${ ({ $type }) => {
    switch ($type) {
      case 'transparent': {
        return css`
          border: none;
          border-radius: ${ ({ theme }) => theme.radius.none };
          outline: none;
          border-bottom: solid 1px ${ ({ theme }) => theme.color.paleGray };

          &:focus-visible {
            border-bottom: solid 2px ${ ({ theme }) => theme.color.primary };
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

export const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => (
  <StyledInput
    ref={ ref }
    { ...props }
  />
));
