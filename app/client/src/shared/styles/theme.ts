import type { DefaultTheme } from "styled-components/dist/types";
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

export type WithTheme<T> = T & { theme: DefaultTheme };
