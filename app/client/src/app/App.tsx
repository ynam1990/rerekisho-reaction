import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme'
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { AppRouter } from './router/AppRouter'
import { AppWrapper } from './App.styles';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

export const App = () => {
  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyle />

      <AppWrapper>
        <Header isAuthenticated={ false } />
        
        <main>
          <AppRouter />
        </main>
        
        <Footer />
      </AppWrapper>
    </ThemeProvider>
  );
};
