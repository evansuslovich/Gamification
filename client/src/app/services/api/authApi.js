import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const initialState = { isLoggedIn: false };

export const authApi = createApi({

  baseQuery: fetchBaseQuery(
    { baseUrl: 'http://localhost:3001/users' }
  ),

  endpoints: (builder) => ({

    getAllUsers: builder.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useGetAllUsersQuery

} = authApi;