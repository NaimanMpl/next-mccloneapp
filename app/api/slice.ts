import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Server } from '../models/server.model';

export const minecraftApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_API_URL }),
  tagTypes: ['Server', 'Servers'],
  endpoints: (builder) => ({
    getServer: builder.query<Server, void>({
      query: (id) => `/api/server/${id}`,
      providesTags: ['Server'],
    }),
    getServers: builder.query<Server[], void>({
      query: () => '/api/servers/',
      providesTags: ['Servers'],
    }),
  }),
});

export const { useGetServerQuery, useGetServersQuery } = minecraftApi;
