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

export const boxShadowStrong = css`
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
`;

export const postItStickLeft = css`
  &::before {
    content: "";
    width: 75%;
    height: 30%;
    position: absolute;
    bottom: -2px;
    right: 6px;
    z-index: -1;
    transform: rotate(4deg);
    background-color: rgba(0, 0, 0, 0.6);
    filter: blur(3px);
  }
`;
