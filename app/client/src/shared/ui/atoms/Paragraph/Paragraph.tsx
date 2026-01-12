import styled, { css, type Interpolation } from 'styled-components'
import type { theme, WithTheme } from '@/shared/styles/theme';
import type { TextAlignTypes, LineHeightTypes } from '@/shared/styles/constants';

type Props = {
  size?: keyof typeof theme.typography.fontSize;
  align?: TextAlignTypes;
  line_height?: LineHeightTypes;
};
type PropsWithTheme = WithTheme<Props>;

const mediaQueryStyle = ({ theme, size = 'md', line_height = 'body' }: PropsWithTheme): Interpolation<Props> => {
  const fontSize = theme.typography.fontSize[size];
  const lineHeight = theme.typography.lineHeight[line_height];

  return css`
    font-size: ${ fontSize.pc };
    line-height: ${ lineHeight.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ fontSize.sp };
      line-height: ${ lineHeight.sp };
    }
  `;
};

export const Paragraph = styled.h1<Props>`
  word-break: break-all;
  text-align: ${ ({ align = 'left' }) => align };

  ${ mediaQueryStyle }
`;
