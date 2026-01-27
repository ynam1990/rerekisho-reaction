import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthSelector } from '@/app/store/hooks';
import { LoadingPage } from '@/pages/loading';

type Props = { children: ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isAuthenticated, isInitialized } = useAuthSelector();

  // 認証状態の確認中表示
  if (!isInitialized) return <LoadingPage />;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/signin"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export const requireAuth = (component: ReactNode) => (
  <ProtectedRoute>
    { component }
  </ProtectedRoute>
);
