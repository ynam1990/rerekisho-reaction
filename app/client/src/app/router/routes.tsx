import { Navigate, type RouteObject } from 'react-router-dom';
import { HomePage } from '@/pages/home'
import { AuthPage } from '@/pages/auth';
import { ResumeListPage } from '@/pages/resumes';
import { ResumePage } from '@/pages/resume';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/auth/:action', element: <AuthPage /> },
  { path: '/resumes', element: <ResumeListPage /> },
  { path: '/resumes/:resumeId', element: <ResumePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
];
