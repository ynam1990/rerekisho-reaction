export const typography = {
  fontSize: {
    sm: { pc: '12px', sp: '12px' },
    md: { pc: '16px', sp: '14px' },
    lg: { pc: '20px', sp: '18px' },
    xl: { pc: '24px', sp: '20px' },
    xxl: { pc: '32px', sp: '24px' },
    xxxl: { pc: '48px', sp: '32px' },
  },
  lineHeight: {
    none: { pc: 1, sp: 1 },
    tight: { pc: 1.2, sp: 1.2 },
    heading: { pc: 1.25, sp: 1.3 },
    body: { pc: 1.6, sp: 1.7 },
    relaxed: { pc: 1.8, sp: 1.9 },
  },
  letterSpacing: {
    body: { pc: 0, sp: '0.02em' },
  }
} as const;
