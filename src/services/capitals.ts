import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Country = {
  capital: string;
};

export const capitalsApi = createApi({
  reducerPath: 'capitalsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://countriesnow.space/api/v0.1/',
  }),
  endpoints: (builder) => ({
    getCapitals: builder.query<Array<string>, null>({
      query: () => 'countries/capital',
      transformResponse: (response: { data: Country[] }) => [
        ...new Set(
          response.data
            .map((country: Country) => country.capital)
            .filter((capital: string) => capital)
            .sort(),
        ),
      ],
    }),
  }),
});

export const { useGetCapitalsQuery } = capitalsApi;
