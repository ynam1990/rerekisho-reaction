import type { theme } from '@/shared/styles/theme';
import styled, { css } from 'styled-components'

type Props = {
  size?: keyof typeof theme.typography.fontSize;
  weight?: 'thin' | 'normal' | 'bold';
  decoration?: 'auto' | 'none' | 'underline' | 'overline' | 'line-through';
};
const propsToStop = new Set([
  'size',
  'weight',
  'decoration',
]);

export const Text = styled.span.withConfig({
  shouldForwardProp: (prop) => !propsToStop.has(prop),
})<Props>`
  font-weight: ${ ({ weight }) => weight ?? 'normal' };
  text-decoration: ${ ({ decoration }) => decoration ?? 'auto' };

  ${ ({ theme, size }) => {
    const fontSize = size && theme.typography.fontSize[size];

    return css`
      font-size: ${ fontSize?.pc ?? 'inherit' };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        font-size: ${ fontSize?.sp ?? 'inherit' };
      }
    `;
  } }
`;
