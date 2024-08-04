import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AddServerFormData } from '../models/formsdata.model';
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
    createServer: builder.mutation<Server, AddServerFormData>({
      query: ({ ip, port, primary }) => ({
        url: '/api/servers/',
        method: 'POST',
        body: {
          primary: primary,
          ip: ip,
          port: port,
        },
      }),
      invalidatesTags: ['Servers'],
    }),
    deleteServer: builder.mutation<
      Server,
      Partial<Server> & Pick<Server, 'id'>
    >({
      query: ({ id }) => ({
        url: `/api/servers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Servers'],
    }),
  }),
});

export const {
  useGetServerQuery,
  useGetServersQuery,
  useCreateServerMutation,
  useDeleteServerMutation,
} = minecraftApi;
