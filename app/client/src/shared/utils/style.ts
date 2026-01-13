import type { DefaultTheme } from 'styled-components';
import type { ColorKey } from '@/shared/styles/theme';

export const pickMainSubColors = (theme: DefaultTheme, colorKey: ColorKey) => {
  const mainColor = theme.color[colorKey];
  const subColor = (colorKey === 'white' || colorKey === 'paperIvory') ? theme.color.inkBlack : theme.color.white;

  return { mainColor, subColor };
};
