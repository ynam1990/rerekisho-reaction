import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme'
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { AppRouter } from './router/AppRouter'
import { AppWrapper } from './App.styles';
import { Header } from '@/shared/ui/organisms/Header';
import { Footer } from '@/shared/ui/organisms/Footer';

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
