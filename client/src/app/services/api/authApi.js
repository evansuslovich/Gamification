import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const initialState = { isLoggedIn: false };

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001/users/' 
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),

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

  }),
});

export const {
  useGetAllUsersQuery,
  useLogoutMutation,
  useLoginMutation, 
  useRegisterMutation,

} = authApi;