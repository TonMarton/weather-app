import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import Layout from '../components/Layout';
import Home from './Home';
import NewCapital from './NewCapital';
import Weather from './Weather';
import { newCapitalLoader, weatherLoader } from './routeLoaders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/newCapital',
        element: <NewCapital />,
        loader: newCapitalLoader,
      },
      {
        path: '/weather/:capital',
        element: <Weather />,
        loader: weatherLoader,
      },
    ],
  },
]);

export default router;
