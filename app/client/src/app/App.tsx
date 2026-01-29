import { useEffect, useRef } from 'react';
import { useAppDispatch, useAuthSelector } from '@/app/store/hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme'
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { AppRouter } from '@/app/router/AppRouter'
import { AppWrapper } from './App.styles';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Toast, type ToastHandle, type ToastOptions } from '@/shared/ui/molecules';
import { ToastContext } from './toast_context';
import { useElementRect } from '@/shared/hooks/useElementRect';
import { initializeAuthThunk } from '@/features/auth';

export const App = () => {
  const { isInitialized, isAuthenticated, currentUserName } = useAuthSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 初回ロード時のログインチェック
    dispatch(initializeAuthThunk());
  }, []);
  
  const { ref: footerRef, elHeight: footerHeight } = useElementRect<HTMLDivElement>();
  const { ref: headerRef, elHeight: headerHeight } = useElementRect<HTMLDivElement>();

  const ref = useRef<ToastHandle | null>(null);
  const showToastWithOptions = (options: ToastOptions) => {
    ref.current?.setOptions(options);
    ref.current?.show();
  };
  
  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyle
        headerHeight={ headerHeight }
        footerHeight={ footerHeight }
      />

      <ToastContext.Provider value={ showToastWithOptions }>
        <AppWrapper>
          <Header
            ref={ headerRef }
            isInitialized={ !!isInitialized }
            isAuthenticated={ isAuthenticated }
            currentUserName={ currentUserName || '-' }
          />
          
          <main>
            <AppRouter />
          </main>
          
          <Footer ref={ footerRef } />

          <Toast ref={ ref } /> 
        </AppWrapper>
      </ToastContext.Provider>
    </ThemeProvider>
  );
};
