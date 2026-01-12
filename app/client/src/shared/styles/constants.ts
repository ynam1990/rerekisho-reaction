export const TEXT_ALIGN_TYPES = [
  'center',
  'left',
  'right',
] as const;
export type TextAlignTypes = typeof TEXT_ALIGN_TYPES[number];

export const LINE_HEIGHT_TYPES = [
  'none',
  'tight',
  'heading',
  'body',
  'relaxed',
] as const;
export type LineHeightTypes = typeof LINE_HEIGHT_TYPES[number];
