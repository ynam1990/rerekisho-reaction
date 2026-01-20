
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle<{
  headerHeight: number;
  footerHeight: number
}>`
  /* 共通スタイル */
  body {
    font-family: 
      'Times New Roman',
      '游明朝体',
      serif;
    color: ${ ({ theme }) => theme.color.inkBlack };
  }

  /* CSS変数 */
  :root {
    --header-height: ${({ headerHeight }) => `${ headerHeight }px`};
    --footer-height: ${({ footerHeight }) => `${ footerHeight }px`};
  }
`;
