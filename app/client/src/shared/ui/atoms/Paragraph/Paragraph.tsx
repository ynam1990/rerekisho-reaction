import styled, { css, type Interpolation } from 'styled-components'
import type { theme, WithTheme } from '@/shared/styles/theme';
import type { TextAlignTypes, LineHeightTypes } from '@/shared/styles/constants';

type Props = {
  size?: keyof typeof theme.typography.fontSize;
  align?: TextAlignTypes;
  lineHeight?: LineHeightTypes;
};
type PropsWithTheme = WithTheme<Props>;
const propsToStop = new Set([
  'size',
  'align',
  'lineHeight',
]);

const mediaQueryStyle = ({ theme, size = 'md', lineHeight = 'body' }: PropsWithTheme): Interpolation<Props> => {
  const fontSize = theme.typography.fontSize[size];
  const lineHeightObj = theme.typography.lineHeight[lineHeight];

  return css`
    font-size: ${ fontSize.pc };
    line-height: ${ lineHeightObj.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ fontSize.sp };
      line-height: ${ lineHeightObj.sp };
    }
  `;
};

export const Paragraph = styled.p.withConfig({
  shouldForwardProp: (prop) => !propsToStop.has(prop),
})<Props>`
  word-break: break-all;
  text-align: ${ ({ align = 'left' }) => align };

  ${ mediaQueryStyle }
`;
