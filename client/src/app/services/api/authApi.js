import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const authApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001/users/',
    prepareHeaders: (headers,) => {
      headers.set('x-access-token', localStorage.getItem('token'));
      return headers 
    },
  }),
  endpoints: (builder) => ({

    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: 'profile',
        method: 'GET'
      })
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLogoutMutation,
  useLoginMutation, 
  useRegisterMutation,
  useProfileQuery,

} = authApi;