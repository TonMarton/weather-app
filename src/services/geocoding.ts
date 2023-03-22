import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Coordinate } from '../types';

const openWeatherMapApiKey = `${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;

export const geocodingApi = createApi({
  reducerPath: 'geocodingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.openweathermap.org/geo/1.0/',
  }),
  endpoints: (builder) => ({
    getCapitalCoordinates: builder.query<Coordinate, string>({
      query: (city) => `direct?q=${city}&limit=1&appid=${openWeatherMapApiKey}`,
      transformResponse: (response: [{ lat: number; lon: number }]) => {
        return <Coordinate>{
          lat: response[0].lat,
          lon: response[0].lon,
        };
      },
    }),
  }),
});

export const { useGetCapitalCoordinatesQuery } = geocodingApi;
