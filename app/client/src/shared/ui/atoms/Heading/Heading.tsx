import type { theme, WithTheme } from '@/shared/styles/theme';
import styled, { css, type Interpolation } from 'styled-components'

type Props = {
  size?: keyof typeof theme.typography.fontSize,
};
type PropsWithTheme = WithTheme<Props>;

const mediaQueryStyle = ({ theme, size = 'xxxl' }: PropsWithTheme): Interpolation<Props> => {
  const fontSize = theme.typography.fontSize[size];

  return css`
    font-size: ${ fontSize.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ fontSize.sp };
    }
  `;
};

export const Heading = styled.h1<Props>`
  font-weight: bold;
  word-break: break-all;
  text-align: center;

  ${ mediaQueryStyle }
`;
