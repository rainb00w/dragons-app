import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dragonsApi = createApi({
  reducerPath: 'SelectedDragons',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3006/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 1,
  tagTypes: ['SelectedDragons'],
  endpoints: builder => ({
    getAllDragons: builder.query({
      query: () => `/dragons`,
      method: 'GET',
      providesTags: ['SelectedDragons'],
    }),
    addDragon: builder.mutation({
      query: ({ name, id }) => ({
        url: '/dragons',
        method: 'POST',
        body: { name: name, dragon_id: id },
      }),
      invalidatesTags: ['SelectedDragons'],
    }),
    deleteDragon: builder.mutation({
      query: id => ({
        url: `/dragons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SelectedDragons'],
    }),
  }),
});

export const {
  useGetAllDragonsQuery,
  useAddDragonMutation,
  useDeleteDragonMutation,
} = dragonsApi;
