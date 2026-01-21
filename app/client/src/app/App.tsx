import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme'
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { AppRouter } from '@/app/router/AppRouter'
import { AppWrapper } from './App.styles';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { useAppSelector } from '@/app/store/hooks';
import { useElementRect } from '@/shared/hooks/useElementRect';

export const App = () => {
  const { isAuthenticated, currentUserId } = useAppSelector((state) => state.auth);
  
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
          isAuthenticated={ isAuthenticated }
          currentUserName={ currentUserId ?? '-' }
        />
        
        <main>
          <AppRouter />
        </main>
        
        <Footer ref={ footerRef } />
      </AppWrapper>
    </ThemeProvider>
  );
};
