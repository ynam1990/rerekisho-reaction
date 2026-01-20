import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme'
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { AppRouter } from './router/AppRouter'
import { AppWrapper } from './App.styles';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { useElementRect } from '@/shared/hooks/useElementRect';

export const App = () => {
  const { ref: footerRef, elHeight: footerHeight } = useElementRect<HTMLDivElement>();
  const { ref: headerRef, elHeight: headerHeight } = useElementRect<HTMLDivElement>();
  
  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyle
        headerHeight={ headerHeight }
        footerHeight={ footerHeight }
      />

      <AppWrapper>
        <Header
          ref={ headerRef }
          isAuthenticated={ true }
        />
        
        <main>
          <AppRouter />
        </main>
        
        <Footer ref={ footerRef } />
      </AppWrapper>
    </ThemeProvider>
  );
};
