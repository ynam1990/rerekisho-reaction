import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme'
import { GlobalStyle } from '@/styles/GlobalStyle';
import { AppRouter } from './router/AppRouter'

export const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
};
