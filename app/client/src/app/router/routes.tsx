import { Navigate, type RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/home'
import { AuthPage } from '@/pages/auth';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/auth/:action', element: <AuthPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
