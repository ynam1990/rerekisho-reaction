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
