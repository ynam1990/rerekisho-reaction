import type { DefaultTheme } from "styled-components"
import { breakpoints } from "./theme/breakpoints";
import { color } from "./theme/color";
import { opacity } from "./theme/opacity";
import { radius } from "./theme/radius";
import { spacing } from "./theme/spacing";
import { typography } from "./theme/typography";
import { zIndex } from "./theme/zIndex";

export const theme = {
  breakpoints,
  color,
  opacity,
  radius,
  spacing,
  typography,
  zIndex,
} as const;

export type BreakpointsKey = keyof typeof breakpoints;
export type ColorKey = keyof typeof color;
export type OpacityKey = keyof typeof opacity;
export type RadiusKey = keyof typeof radius;
export type SpacingKey = keyof typeof spacing;
export type TypographyKey = keyof typeof typography;
export type ZIndexKey = keyof typeof zIndex;

export type WithTheme<T> = T & { theme: DefaultTheme };
