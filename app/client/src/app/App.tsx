import { useEffect, useRef } from 'react';
import { useAppDispatch, useAuthSelector } from '@/app/store/hooks';
import type { Paths } from '@/shared/api/type';
import { callAPI } from '@/shared/api/request';
import { setAuthenticationState } from '@/features/auth';
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

export const App = () => {
  const { isAuthenticated, currentUserName } = useAuthSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 初回ロード時のログインチェック
    const { promise, abort } = callAPI<
      Paths["/api/auth/me"]["get"]["responses"]["200"]["content"]["application/json"]
    >(
      '/auth/me',
      {
        method: 'GET',
        suppressError: true,
      },
    );

    promise.then((response) => {
      // ログイン済み
      dispatch(setAuthenticationState({
        isInitialized: true,
        isAuthenticated: true,
        currentUserName: response.username || '',
      }));
    }).catch(() => {
      // 未ログインまたはセッション切れ
      dispatch(setAuthenticationState({
        isInitialized: true,
        isAuthenticated: false,
        currentUserName: '',
      }));
    });

    return () => {
      abort();
    };
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
            isAuthenticated={ isAuthenticated }
            currentUserName={ currentUserName ?? '-' }
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
