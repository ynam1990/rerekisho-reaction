import type { theme, WithTheme } from '@/shared/styles/theme';
import styled, { css, type Interpolation } from 'styled-components'

export const BUTTON_TYPES = [
  'default',
  'success',
  'proceed',
  'cancel',
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
  cursor: pointer;
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease,
    background-color 0.15s ease;

  ${ mediaQueryStyle }

  ${ ({ theme, type = 'default' }) => {
    const color = theme.color;

    switch (type) {
      case 'success': {
        return css`
          color: ${ color.white };
          border: 1px solid ${ color.paperIvory };
          background-color: ${ color.successGreen };
        `;
      }
      case 'proceed': {
        return css`
          color: ${ color.white };
          border: 1px solid ${ color.paperIvory };
          background-color: ${ color.proceedBlue };
        `;
      }
      case 'cancel': {
        return css`
          color: ${ color.white };
          border: 1px solid ${ color.paperIvory };
          background-color: ${ color.cancelGray };
        `;
      }
      case 'danger': {
        return css`
          color: ${ color.white };
          border: 1px solid ${ color.paperIvory };
          background-color: ${ color.dangerRed };
        `;
      }
      default: {
        return css`
          color: ${ color.inkBlack };
          border: 1px solid ${ color.inkBlack };
          background-color: ${ color.paperIvory };
        `;
      }
    }
  } }

  &:hover {
    opacity: ${ ({ theme }) => theme.opacity.hover };
  }

  &:active {
    transform: translateY(2px);
  }

  &:focus-visible {
    border-width: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${ ({ theme }) => theme.opacity.disabled };
  }
`;
