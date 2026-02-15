import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithAppProvidersForTest, TEST_USER_AUTH_INFO } from '@/test/test_utils';
import { Route } from 'react-router-dom';
import { AuthPage } from './AuthPage';
import { ResumeListPage } from '@/pages/resumes';

describe('AuthPage', () => {
  const showToastWithOptions = vi.fn();

  // 描画
  const renderAuthPage = (initialEntry: string) => {
    return renderWithAppProvidersForTest(
      <AuthPage />,
      {
        path: '/auth/:action',
        initialEntries: [initialEntry],
        // 遷移先ページのルートを追加します
        extraRoutes: <Route path="/resumes" element={ <ResumeListPage /> } />,
        showToastWithOptions,
      },
    );
  };

  describe('サインイン', () => {
    const SIGN_IN_PATH = '/auth/signin';  

    it('サインインフォームが表示される', () => {
      renderAuthPage(SIGN_IN_PATH);
  
      // 検証：サインインフォームが表示されている
      expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
    });

    it('usernameとpasswordが正しいときログイン成功トーストが表示される', async () => {
      renderAuthPage(SIGN_IN_PATH);
      const user = userEvent.setup();

      const usernameInput = screen.getByLabelText('ユーザ名');
      const passwordInput = screen.getByLabelText('パスワード');
      const submitButton = screen.getByRole('button', { name: 'ログイン' });
      await user.type(usernameInput, TEST_USER_AUTH_INFO.username);
      await user.type(passwordInput, TEST_USER_AUTH_INFO.password);
      await user.click(submitButton);

      await waitFor(() => {
        // 検証：成功トーストが表示される
        expect(showToastWithOptions).toHaveBeenCalledWith(expect.objectContaining({ icon: 'success' }));
      });
    });

    it('usernameとpasswordが不正なとき失敗トーストが表示される', async () => {
      renderAuthPage(SIGN_IN_PATH);
      const user = userEvent.setup();

      const usernameInput = screen.getByLabelText('ユーザ名');
      const passwordInput = screen.getByLabelText('パスワード');
      const submitButton = screen.getByRole('button', { name: 'ログイン' });
      await user.type(usernameInput, 'wrong-user');
      await user.type(passwordInput, 'wrong-password');
      await user.click(submitButton);

      await waitFor(() => {
        // 検証：エラートーストが表示される
        expect(showToastWithOptions).toHaveBeenCalledWith(expect.objectContaining({ icon: 'error' }));
      });
    });
  });

  describe('サインアップ', () => {
    const SIGN_UP_PATH = '/auth/signup';

    it('サインアップフォームが表示される', () => {
      renderAuthPage(SIGN_UP_PATH);
  
      // 検証：サインアップフォームが表示されている
      expect(screen.getByRole('button', { name: '登録実行' })).toBeInTheDocument();
    });

    it('全ての値が入力されるまで、API通信が行われない', async () => {
      renderAuthPage(SIGN_UP_PATH);
      const user = userEvent.setup();
      vi.spyOn(global, 'fetch');

      const usernameInput = screen.getByLabelText('ユーザ名');
      const passwordInput = screen.getByLabelText('パスワード');
      const confirmPasswordInput = screen.getByLabelText('パスワードの確認');
      const agreeCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: '登録実行' });

      // 部分的にしか入力しないケースを順番に試すため、始めに全て入力します
      await user.type(usernameInput, 'newuser');
      await user.type(passwordInput, 'newpassword');
      await user.type(confirmPasswordInput, 'newpassword');
      await user.click(agreeCheckbox);

      // 以下、個別の項目をクリアして送信し、API通信が行われない(フロント側のバリデーションで止まる)ことを確認します
      await user.clear(usernameInput);
      await user.click(submitButton);
      expect(global.fetch).not.toHaveBeenCalled();
      await user.type(usernameInput, 'newuser');

      await user.clear(passwordInput);
      await user.click(submitButton);
      expect(global.fetch).not.toHaveBeenCalled();
      await user.type(passwordInput, 'newpassword');

      await user.clear(confirmPasswordInput);
      await user.click(submitButton);
      expect(global.fetch).not.toHaveBeenCalled();
      // パスワードが不一致の場合もAPI通信が行われないことを確認します
      await user.type(confirmPasswordInput, 'differentpassword');
      await user.click(submitButton);
      expect(global.fetch).not.toHaveBeenCalled();
      await user.clear(confirmPasswordInput);
      await user.type(confirmPasswordInput, 'newpassword');

      await user.click(agreeCheckbox);
      await user.click(submitButton);
      expect(global.fetch).not.toHaveBeenCalled();
      await user.click(agreeCheckbox);

      // 全ての値が入力された状態で送信します
      await user.click(submitButton);
      await waitFor(() => {
        // 検証：API通信が行われる
        expect(global.fetch).toHaveBeenCalled();
      });
    });

    it('サインアップ後に成功トーストが表示される', async () => {
      renderAuthPage(SIGN_UP_PATH);
      const user = userEvent.setup();

      const usernameInput = screen.getByLabelText('ユーザ名');
      const passwordInput = screen.getByLabelText('パスワード');
      const confirmPasswordInput = screen.getByLabelText('パスワードの確認');
      const agreeCheckbox = screen.getByRole('checkbox');
      const submitButton = screen.getByRole('button', { name: '登録実行' });
      await user.type(usernameInput, 'newuser');
      await user.type(passwordInput, 'newpassword');
      await user.type(confirmPasswordInput, 'newpassword');
      await user.click(agreeCheckbox);
      await user.click(submitButton);

      await waitFor(() => {
        // 検証：成功トーストが表示される
        expect(showToastWithOptions).toHaveBeenCalledWith(expect.objectContaining({ icon: 'success' }));
      });
    });

  });
});
