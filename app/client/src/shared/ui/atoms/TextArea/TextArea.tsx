import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import styled, { css } from 'styled-components'
import type { ColorKey } from '@/shared/styles/theme';
import { pickWhite } from '@/shared/utils/style';

export const TEXTAREA_STYLE_TYPES = [
  'default',
  'transparent',
] as const;
export type TextAreaStyleTypes = typeof TEXTAREA_STYLE_TYPES[number];

type Props = {
  styleType?: TextAreaStyleTypes;
  outlineColor?: ColorKey;
} & ComponentPropsWithoutRef<'textarea'>;
const propsToStop = new Set([
  'styleType',
  'outlineColor',
]);

const StyledTextArea = styled.textarea.withConfig({
    shouldForwardProp: (prop) => !propsToStop.has(prop),
  })<Props>`
  width: 100%;
  height: 96px;
  resize: vertical;

  ${ ({ theme, outlineColor = 'primary' }) => {
    const { typography, spacing } = theme;
    const { fontSize, lineHeight, letterSpacing } = typography;
  
    return css`
        background-color: ${ pickWhite(theme) };
        outline-color: ${ theme.color[outlineColor] };
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
    }
  }

  ${ ({ styleType, outlineColor = 'primary' }) => {
    switch (styleType) {
      case 'transparent': {
        return css`
          border: none;
          border-radius: ${ ({ theme }) => theme.radius.none };
          outline: none;
          background-color: transparent;
          border-bottom: solid 1px ${ ({ theme }) => theme.color.paleGray };
          resize: none;

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

export const TextArea = forwardRef<HTMLTextAreaElement, Props>((props: Props, ref) => (
  <StyledTextArea
    ref={ ref }
    { ...props }
  />
));
