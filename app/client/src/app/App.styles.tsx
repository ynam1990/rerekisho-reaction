import styled from "styled-components";

export const AppWrapper = styled.div`
  min-height: 100vh; /* 古いブラウザ用 */
  min-height: 100dvh;

  display: flex;
  flex-direction: column;

  &> main {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${ ({ theme }) => theme.color.backgroundGray };
  }
`;
