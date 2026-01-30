import { useEffect, useRef } from 'react';
import { useAuthSelector } from '@/app/store/hooks';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/shared/styles/theme'
import { GlobalStyle } from '@/shared/styles/GlobalStyle';
import { AppRouter } from '@/app/router/AppRouter'
import { AppWrapper } from './App.styles';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Modal, Toast, type ModalHandle, type ModalOptions, type ToastHandle, type ToastOptions } from '@/shared/ui/molecules';
import { ToastContext } from './toast_context';
import { ModalContext } from './modal_context';
import { useElementRect } from '@/shared/hooks/useElementRect';
import { useGetMe } from '@/features/auth';

export const App = () => {
  const { isInitialized, isAuthenticated, currentUserName } = useAuthSelector();

  const { initializeAuth } = useGetMe();
  useEffect(() => {
    // 初回ロード時のログインチェック
    initializeAuth();
  }, []);
  
  const { ref: footerRef, elHeight: footerHeight } = useElementRect<HTMLDivElement>();
  const { ref: headerRef, elHeight: headerHeight } = useElementRect<HTMLDivElement>();

  const toastRef = useRef<ToastHandle | null>(null);
  const showToastWithOptions = (options: ToastOptions) => {
    toastRef.current?.setOptions(options);
    toastRef.current?.show();
  };

  const modalRef = useRef<ModalHandle>(null);
  const showModalWithOptions = (options: ModalOptions) => {
    modalRef.current?.setOptions(options);
    modalRef.current?.show();
  };
  const hideModal = () => {
    modalRef.current?.hide();
  };
  
  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyle
        headerHeight={ headerHeight }
        footerHeight={ footerHeight }
      />

      <ToastContext.Provider value={ showToastWithOptions }>
        <ModalContext.Provider value={ { showModalWithOptions, hideModal } }>
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

            <Toast ref={ toastRef } /> 
            <Modal ref={ modalRef } />
          </AppWrapper>
        </ModalContext.Provider>
      </ToastContext.Provider>
    </ThemeProvider>
  );
};
