import type { theme, WithTheme } from '@/shared/styles/theme';
import styled, { css, type Interpolation } from 'styled-components'

type Props = {
  size?: keyof typeof theme.typography.fontSize;
  weight?: 'thin' | 'normal' | 'bold';
  decoration?: 'auto' | 'none' | 'underline' | 'overline' | 'line-through';
};
type PropsWithTheme = WithTheme<Props>;

const mediaQueryStyle = ({ theme, size }: PropsWithTheme): Interpolation<Props> => {
  const fontSize = size && theme.typography.fontSize[size];

  return css`
    font-size: ${ fontSize?.pc ?? 'inherit' };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ fontSize?.sp ?? 'inherit' };
    }
  `;
};

export const Text = styled.span<Props>`
  font-weight: ${ ({ weight }) => weight ?? 'normal' };
  text-decoration: ${ ({ decoration }) => decoration ?? 'auto' };

  ${ mediaQueryStyle }
`;
