import { css } from 'styled-components';

export const hideOnPC = css`
  @media (min-width: ${({ theme }) => theme.breakpoints.sp}) {
    display: none;
  }
`;

export const hideOnSP = css`
  @media (max-width: ${({ theme }) => theme.breakpoints.sp}) {
    display: none;
  }
`;

export const hideOnMin = css`
  @media (max-width: ${({ theme }) => theme.breakpoints.min}) {
    display: none;
  }
`;

export const boxShadow = css`
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;

export const boxShadowTop = css`
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.2);
`;
