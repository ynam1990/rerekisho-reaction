import { Navigate, type RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/home'
import { AuthPage } from '@/pages/auth';
import { ResumeListPage } from '@/pages/resumes';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/auth/:action', element: <AuthPage /> },
  { path: '/resumes', element: <ResumeListPage /> },
  { path: '/resumes/:resumeId', element: null },
  { path: '*', element: <Navigate to="/" replace /> },
];
