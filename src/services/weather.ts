import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { convertEpochToTimeString } from '../utils';
import { Weather } from '../types';

const openWeatherMapApiKey = `${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`;

type WeatherResponse = {
  weather: [{ description: string; icon: string }];
  main: { temp: number };
  timezone: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeatherByLocation: builder.query<Weather, { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `weather/?lat=${lat}&lon=${lon}&appid=${openWeatherMapApiKey}&units=metric`,
      transformResponse: (response: WeatherResponse) => {
        const {
          weather: [{ description, icon }],
          main: { temp },
          timezone,
          sys,
        } = response;
        return <Weather>{
          description,
          icon,
          temperature: `${temp.toString().split('.')[0]} °C`,
          timezone,
          sunriseTime: convertEpochToTimeString(sys.sunrise, timezone),
          sunsetTime: convertEpochToTimeString(sys.sunset, timezone),
        };
      },
    }),
  }),
});

export const { useGetWeatherByLocationQuery } = weatherApi;
