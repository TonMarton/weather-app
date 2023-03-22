import React from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './ErrorPage';
import Home from './routes/Home';
import NewCapital from './routes/NewCapital';
import Weather from './routes/Weather';
import { store } from './store';
import { capitalsApi } from './services/capitals';
import { geocodingApi } from './services/geocoding';
import { saveCapital } from './actions';
import { weatherApi } from './services/weather';

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
        loader: async () => {
          const promise = store.dispatch(
            capitalsApi.endpoints.getCapitals.initiate(null),
          );
          try {
            const capitals = await promise.unwrap();
            const { savedCapitals } = store.getState().reducer;
            return capitals.filter(
              (capital) => !savedCapitals.includes(capital),
            );
          } catch (e) {
            return redirect('/');
          } finally {
            promise.unsubscribe();
          }
        },
      },
      {
        path: '/weather/:capital',
        element: <Weather />,
        loader: async ({ params }) => {
          const capitalName = params.capital as string;
          const savedCapital = Boolean(
            store.getState().reducer.savedCapitals.includes(capitalName),
          );
          const coordinatesPromise = store.dispatch(
            geocodingApi.endpoints.getCapitalCoordinates.initiate(capitalName),
          );
          let weatherPromise = null;
          try {
            const capital = await coordinatesPromise.unwrap();
            if (!savedCapital) store.dispatch(saveCapital(capitalName));
            weatherPromise = store.dispatch(
              weatherApi.endpoints.getWeatherByLocation.initiate(capital),
            );
            const weather = await weatherPromise.unwrap();
            return { weather, capitalName };
          } catch (e) {
            return redirect('/');
          } finally {
            coordinatesPromise.unsubscribe();
            weatherPromise?.unsubscribe();
          }
        },
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
