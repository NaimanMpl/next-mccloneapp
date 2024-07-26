import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ServerInfo } from '../models/serverinfo.model';

export const minecraftApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_API_URL }),
  tagTypes: [
    'ServerInfo',
  ],
  endpoints: (builder) => ({
    getServer: builder.query<ServerInfo, void>({
      query: () => '/server/',
      providesTags: ['ServerInfo']
    }),
  })
});

export const { useGetServerQuery } = minecraftApi;