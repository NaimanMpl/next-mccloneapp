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
      transformErrorResponse: (): ServerInfo => ({
        id: 1,
        ip: 'Erreur',
        onlinePlayers: 0,
        status: 'OFFLINE',
        totalPlayers: 0,
      }),
      providesTags: ['ServerInfo']
    }),
  })
});

export const { useGetServerQuery } = minecraftApi;