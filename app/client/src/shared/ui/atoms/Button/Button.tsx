import type { theme, WithTheme } from '@/shared/styles/theme';
import styled, { css, type Interpolation } from 'styled-components'

export const BUTTON_TYPES = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'danger',
] as const;
export type ButtonTypes = typeof BUTTON_TYPES[number];

type Props = {
  type?: ButtonTypes;
  size?: keyof typeof theme.typography.fontSize;
};
type PropsWithTheme = WithTheme<Props>;

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

export const Button = styled.button<Props>`
  font-weight: bold;
  border-radius: ${ ({ theme }) => theme.radius.lg };
  outline-style: solid;
  outline-width: 0;
  cursor: pointer;
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease,
    background-color 0.15s ease;

  ${ mediaQueryStyle }

  ${ ({ theme, type = 'default' }) => {
    const color = theme.color;

    switch (type) {
      case 'primary': {
        return css`
          color: ${ color.white };
          outline-color: ${ color.paperIvory };
          background-color: ${ color.primary };
        `;
      }
      case 'secondary': {
        return css`
          color: ${ color.white };
          outline-color: ${ color.paperIvory };
          background-color: ${ color.secondary };
        `;
      }
      case 'tertiary': {
        return css`
          color: ${ color.white };
          outline-color: ${ color.paperIvory };
          background-color: ${ color.tertiary };
        `;
      }
      case 'danger': {
        return css`
          color: ${ color.white };
          outline-color: ${ color.paperIvory };
          background-color: ${ color.danger };
        `;
      }
      default: {
        return css`
          color: ${ color.inkBlack };
          outline-color: ${ color.inkBlack };
          background-color: ${ color.paperIvory };
        `;
      }
    }
  } }

  &:hover {
    outline-width: 2px;
  }

  &:active {
    opacity: ${ ({ theme }) => theme.opacity.active };
  }

  &:focus-visible {
    outline-width: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${ ({ theme }) => theme.opacity.disabled };
  }
`;
