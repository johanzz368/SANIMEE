import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { CardSkeletonGrid } from './components/ui/Skeleton';

// Page lazy imports
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const DetailPage = lazy(() => import('./pages/DetailPage').then(m => ({ default: m.DetailPage })));
const WatchPage = lazy(() => import('./pages/WatchPage').then(m => ({ default: m.WatchPage })));
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })));
const SchedulePage = lazy(() => import('./pages/SchedulePage').then(m => ({ default: m.SchedulePage })));
const GenrePage = lazy(() => import('./pages/GenrePage').then(m => ({ default: m.GenrePage })));
const AZListPage = lazy(() => import('./pages/AZListPage').then(m => ({ default: m.AZListPage })));
const OngoingPage = lazy(() => import('./pages/OngoingPage').then(m => ({ default: m.OngoingPage })));
const CompletedPage = lazy(() => import('./pages/CompletedPage').then(m => ({ default: m.CompletedPage })));
const HistoryPage = lazy(() => import('./pages/HistoryPage').then(m => ({ default: m.HistoryPage })));
const BookmarkPage = lazy(() => import('./pages/BookmarkPage').then(m => ({ default: m.BookmarkPage })));

const PageSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense
    fallback={
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <CardSkeletonGrid count={12} />
      </div>
    }
  >
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PageSuspense><HomePage /></PageSuspense> },
      { path: 'anime/:slug', element: <PageSuspense><DetailPage /></PageSuspense> },
      { path: 'episode/:slug', element: <PageSuspense><WatchPage /></PageSuspense> },
      { path: 'cari', element: <PageSuspense><SearchPage /></PageSuspense> },
      { path: 'jadwal', element: <PageSuspense><SchedulePage /></PageSuspense> },
      { path: 'genre', element: <PageSuspense><GenrePage /></PageSuspense> },
      { path: 'genre/:slug', element: <PageSuspense><GenrePage /></PageSuspense> },
      { path: 'daftar', element: <PageSuspense><AZListPage /></PageSuspense> },
      { path: 'ongoing', element: <PageSuspense><OngoingPage /></PageSuspense> },
      { path: 'completed', element: <PageSuspense><CompletedPage /></PageSuspense> },
      { path: 'riwayat', element: <PageSuspense><HistoryPage /></PageSuspense> },
      { path: 'bookmark', element: <PageSuspense><BookmarkPage /></PageSuspense> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
