import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import type { ModalOptions, ToastOptions } from '@/shared/ui/molecules';
import { ModalContext } from '@/app/modal_context';
import { ToastContext } from '@/app/toast_context';
import { render } from '@testing-library/react';
import { theme } from '@/shared/styles/theme';
import { store } from '@/app/store/store';
export { server as mswServer, TEST_USER_AUTH_INFO } from '../../../../openapi/msw/server';

// 単体テスト用のレンダリング関数
export const renderWithThemeForTest = (ui: ReactNode) => {
  return render(
    <ThemeProvider theme={ theme }>
      { ui }
    </ThemeProvider>
  );
};

// 統合テスト用のレンダリング関数
type AppProvidersOptions = {
  // パスの指定
  path?: string;
  // Routerのモック初期履歴
  initialEntries?: string[];
  // 追加のルート要素
  extraRoutes?: ReactNode;
  // トースト表示関数のモック
  showToastWithOptions?: (options: ToastOptions) => void;
  // モーダル表示関数のモック
  showModalWithOptions?: (options: ModalOptions) => void;
  hideModal?: () => void;
};
export const renderWithAppProvidersForTest = (
  ui: ReactNode,
  options: AppProvidersOptions = {},
) => {
  const {
    path = '/',
    initialEntries = [path],
    extraRoutes = null,
    showToastWithOptions = () => {},
    showModalWithOptions = () => {},
    hideModal = () => {},
  } = options;

  return renderWithThemeForTest(
    <Provider store={ store }>
      <ToastContext.Provider value={ showToastWithOptions }>
        <ModalContext.Provider value={ { showModalWithOptions, hideModal } }>
          <MemoryRouter initialEntries={ initialEntries }>
            <Routes>
              <Route path={ path } element={ ui } />
              { extraRoutes }
            </Routes>
          </MemoryRouter>
        </ModalContext.Provider>
      </ToastContext.Provider>
    </Provider>
  );
};
