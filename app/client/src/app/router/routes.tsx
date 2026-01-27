import { Navigate, type RouteObject } from 'react-router-dom';
import { requireAuth, withoutAuth } from '@/app/router/ProtectedRoute';
import { HomePage } from '@/pages/home'
import { AuthPage } from '@/pages/auth';
import { ResumeListPage } from '@/pages/resumes';
import { ResumePage } from '@/pages/resume';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/auth/:action', element: withoutAuth(<AuthPage />) },
  { path: '/resumes', element: requireAuth(<ResumeListPage />) },
  { path: '/resumes/:resumeId', element: requireAuth(<ResumePage />) },
  { path: '*', element: <Navigate to="/" replace /> },
];
