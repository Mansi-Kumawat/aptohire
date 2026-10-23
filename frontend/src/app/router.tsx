import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { PageShell } from '@/components/layout/PageShell';
import { ScrollToTop } from './ScrollToTop';
import { Skeleton } from '@/components/ui/Skeleton';
import { env } from '@/config/env';

// Lazy-loaded routes for code splitting
const Pricing = lazy(() => import('@/pages/Pricing').then((m) => ({ default: m.Pricing })));
const GetStarted = lazy(() => import('@/pages/GetStarted').then((m) => ({ default: m.GetStarted })));
const ApplyUniversity = lazy(() => import('@/pages/ApplyUniversity').then((m) => ({ default: m.ApplyUniversity })));
const ApplyOrganization = lazy(() => import('@/pages/ApplyOrganization').then((m) => ({ default: m.ApplyOrganization })));
const VerifyLookup = lazy(() => import('@/pages/VerifyLookup').then((m) => ({ default: m.VerifyLookup })));
const VerifyCredential = lazy(() => import('@/pages/VerifyCredential').then((m) => ({ default: m.VerifyCredential })));
const Privacy = lazy(() => import('@/pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('@/pages/Terms').then((m) => ({ default: m.Terms })));
const AiFairness = lazy(() => import('@/pages/AiFairness').then((m) => ({ default: m.AiFairness })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));
const Demo = lazy(() => import('@/pages/Demo').then((m) => ({ default: m.Demo })));

const PageLoadingFallback: React.FC = () => (
  <div className="py-24 max-w-2xl mx-auto px-4 space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-48 w-full rounded-panel" />
  </div>
);

const RootLayout: React.FC = () => (
  <PageShell>
    <ScrollToTop />
    <Suspense fallback={<PageLoadingFallback />}>
      <Outlet />
    </Suspense>
  </PageShell>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'get-started',
        element: <GetStarted />,
      },
      {
        path: 'login',
        element: <Navigate to="/get-started?intent=student" replace />,
      },
      {
        path: 'signup',
        element: <Navigate to="/get-started?intent=student" replace />,
      },
      {
        path: 'apply/university',
        element: <ApplyUniversity />,
      },
      {
        path: 'apply/organization',
        element: <ApplyOrganization />,
      },
      {
        path: 'verify',
        element: <VerifyLookup />,
      },
      {
        path: 'verify/:credentialId',
        element: <VerifyCredential />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'ai-and-fairness',
        element: <AiFairness />,
      },
      ...(env.VITE_DEMO_MODE
        ? [
            {
              path: 'demo',
              element: <Demo />,
            },
          ]
        : []),
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
