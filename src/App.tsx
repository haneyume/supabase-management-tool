import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { theme } from '@/theme';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';

import '@/index.css';

import { AppReduxProvider, store } from '@/app-redux';

import { AppLayout } from './AppLayout';
import { OverviewPage, GraphQLPage, RLSPage } from './pages';

import { AppProvider } from './layouts/AppContext';

export const App = () => {
  return (
    <AppReduxProvider store={store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <ModalsProvider>
          <Notifications position="top-right" />

          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </ModalsProvider>
      </MantineProvider>
    </AppReduxProvider>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <OverviewPage />,
      },
      {
        path: 'graphql',
        element: <GraphQLPage />,
      },
      {
        path: 'rls',
        element: <RLSPage />,
      },
    ],
  },
]);
