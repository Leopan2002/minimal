import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import { Outlet, Navigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductPage = lazy(() => import('src/pages/product'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const FilePage = lazy(() => import('src/pages/file'));
export const CoursePage = lazy(() => import('src/pages/course'));
export const KanbanPage = lazy(() => import('src/pages/kanban'));
export const ChatPage = lazy(() => import('src/pages/chat'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// User child pages
export const UserListView = lazy(() => import('src/sections/user/view').then(m => ({ default: m.UserListView })));
export const UserCardsView = lazy(() => import('src/sections/user/view').then(m => ({ default: m.UserCardsView })));
export const UserProfileView = lazy(() => import('src/sections/user/view').then(m => ({ default: m.UserProfileView })));

// Product child pages
export const ProductsView = lazy(() => import('src/sections/product/view').then(m => ({ default: m.ProductsView })));
export const ProductListView = lazy(() => import('src/sections/product/view').then(m => ({ default: m.ProductListView })));
export const ProductDetailView = lazy(() => import('src/sections/product/view').then(m => ({ default: m.ProductDetailView })));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { 
        path: 'user',
        element: <UserPage />,
        children: [
          { index: true, element: <Navigate to="list" replace /> },
          { path: 'list', element: <UserListView /> },
          { path: 'profile', element: <UserProfileView /> },
          { path: 'cards', element: <UserCardsView /> },
        ],
      },
      {
        path: 'product',
        element: <ProductPage />,
        children: [
          { index: true, element: <Navigate to="shop" replace /> },
          { path: 'shop', element: <ProductsView /> },
          { path: 'list', element: <ProductListView /> },
          { path: ':id', element: <ProductDetailView /> },
        ],
      },
      { path: 'blog', element: <BlogPage /> },
      { path: 'file', element: <FilePage /> },
      { path: 'course', element: <CoursePage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'chat', element: <ChatPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
