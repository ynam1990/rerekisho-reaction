import type { theme } from '@/shared/styles/theme';
import styled, { css } from 'styled-components'

type Props = {
  size?: keyof typeof theme.typography.fontSize;
};
const propsToStop = new Set([
  'size',
]);

export const Heading = styled.h1.withConfig({
  shouldForwardProp: (prop) => !propsToStop.has(prop),
})<Props>`
  font-weight: bold;
  word-break: break-all;
  text-align: center;

  ${ ({ theme, size = 'xxxl' }) => {
    const fontSize = theme.typography.fontSize[size];
    const lineHeight = theme.typography.lineHeight;

    return css`
      font-size: ${ fontSize.pc };
      line-height: ${ lineHeight.tight.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        font-size: ${ fontSize.sp };
        line-height: ${ lineHeight.tight.sp };
      }
    `;
  } }
`;
