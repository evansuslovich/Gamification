import { configureStore } from '@reduxjs/toolkit'

import authReducer from './services/slices/authSlice'
import { authApi } from './services/api/authApi'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },


  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
  ),
})