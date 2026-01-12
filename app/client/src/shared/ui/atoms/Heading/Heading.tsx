import type { theme, WithTheme } from '@/shared/styles/theme';
import styled, { css, type Interpolation } from 'styled-components'

type Props = {
  size?: keyof typeof theme.typography.fontSize;
};
type PropsWithTheme = WithTheme<Props>;

const mediaQueryStyle = ({ theme, size = 'xxxl' }: PropsWithTheme): Interpolation<Props> => {
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
};

export const Heading = styled.h1<Props>`
  font-weight: bold;
  word-break: break-all;
  text-align: center;

  ${ mediaQueryStyle }
`;
