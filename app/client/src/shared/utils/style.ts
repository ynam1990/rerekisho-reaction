import type { DefaultTheme } from 'styled-components';
import type { ColorKey } from '@/shared/styles/theme';

export const pickMainSubColors = (theme: DefaultTheme, colorKey: ColorKey) => {
  const mainColor = theme.color[colorKey];
  const subColor = (colorKey === 'white' || colorKey === 'paperWhite') ? theme.color.inkBlack : theme.color.paperWhite;

  return { mainColor, subColor };
};

export const pickWhite = (theme: DefaultTheme) => {
  return theme.color.paperWhite;
};
