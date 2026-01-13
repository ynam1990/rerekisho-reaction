
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* 共通スタイル */
  body {
    font-family: serif;
    color: ${ ({ theme }) => theme.color.inkBlack };
  }
`;
