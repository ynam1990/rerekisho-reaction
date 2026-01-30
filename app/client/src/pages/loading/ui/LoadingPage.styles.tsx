import styled, { css } from "styled-components";

export const LoadingPageWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;

  /* フラッシュを避けるため、最初はopacityを0にしています。APIのレスポンスが遅延している場合に備えて、3秒経った後は表示します */
  animation: fadeIn 1s ease-in-out 3s forwards;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export const LoadingText = styled.div`
  ${ ({ theme }) => {
    return css`
    color: ${ theme.color.primary };
    font-size: ${ theme.typography.fontSize.xxl.pc };
    
    @media (max-width: ${ theme.breakpoints.sp}) {
      font-size: ${ theme.typography.fontSize.xxl.sp };
    }
  `;
  } }
`;

export const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid ${ ({ theme }) => theme.color.primary };
  border-left-color: transparent;
  border-radius: 50%;
  width: 50%;
  aspect-ratio: 1 / 1;
  pointer-events: none;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
