import { Navigate, type RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage'
import { AuthPage } from '@/pages/AuthPage';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/auth/:action', element: <AuthPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
