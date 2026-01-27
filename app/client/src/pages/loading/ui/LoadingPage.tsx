import { LoadingPageWrapper, LoadingText, Spinner } from "./LoadingPage.styles";

export const LoadingPage = () => {
  return (
    <LoadingPageWrapper>
      <LoadingText>Loading</LoadingText>
      <Spinner />
    </LoadingPageWrapper>
  );
};
