import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAuthSelector } from '@/app/store/hooks';
import { LoadingPage } from '@/pages/loading';

// サイト全体を通して初回表示の一回のみフェードインする目的で、モジュールスコープに状態を保持します
let hasFadeInAnimationRun = false;

type Props = {
  requireAuth: boolean;
  children: ReactNode
};

const ProtectedRoute = (props: Props) => {
  const {
    children,
    requireAuth,
  } = props;

  const location = useLocation();
  const { isAuthenticated, isInitialized } = useAuthSelector();

  // 認証状態の確認中表示
  if (!isInitialized) return <LoadingPage />;

  // 認証が必要なページの場合
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate
        to="/auth/signin"
        replace
        state={{ from: location }}
      />
    );
  }

  // 認証されている間は開かないページの場合
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/resumes" replace />;
  }

  // 一度のみアニメーションし、かつ再レンダリングを発火させないように状態をtrueにします
  requestAnimationFrame(() => {
    hasFadeInAnimationRun = true;
  });
  // 認証確認後のフラッシュを防ぐためフェードインします
  return <FadeInWrapper $animate={ !hasFadeInAnimationRun } >{ children }</FadeInWrapper>;
};

export const requireAuth = (component: ReactNode) => (
  <ProtectedRoute requireAuth={ true }>
    { component }
  </ProtectedRoute>
);

export const withoutAuth = (component: ReactNode) => (
  <ProtectedRoute requireAuth={ false }>
    { component }
  </ProtectedRoute>
);

const FadeInWrapper = styled.div<{ $animate: boolean }>`
  flex: 1;
  width: 100%;
  display: inherit;
  flex-direction: inherit;
  justify-content: inherit;
  align-items: inherit;

  ${ ({ $animate }) => {
    if (!$animate) {
      return css`
        opacity: 1;
        animation: none;
      `;
    } else {
      return css`
        opacity: 0;
        animation: fadeIn 0.6s ease-in-out forwards;
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `;
    }
  } }
`;
