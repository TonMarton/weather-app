import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { weatherApi } from './services/weather';
import { capitalsApi } from './services/capitals';
import { geocodingApi } from './services/geocoding';

export const store = configureStore({
  reducer: {
    reducer,
    [capitalsApi.reducerPath]: capitalsApi.reducer,
    [geocodingApi.reducerPath]: geocodingApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      capitalsApi.middleware,
      geocodingApi.middleware,
      weatherApi.middleware,
    ),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
