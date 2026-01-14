
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* 共通スタイル */
  body {
    font-family: 
      'Times New Roman',
      '游明朝体',
      serif;
    color: ${ ({ theme }) => theme.color.inkBlack };
  }
`;
