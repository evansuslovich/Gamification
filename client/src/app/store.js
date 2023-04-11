import { configureStore } from '@reduxjs/toolkit'


import authReducer from './services/slices/authSlice'
import { authApi } from './services/api/authApi'

let store; // singleton store 

const setupStore = () => {
  
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      authApi.middleware,
    ),
  })

}

// acts as a singleton factory method
const getStore = () => {
  if (store === undefined) {
    store = setupStore();
  }
  return store;
};

export default getStore;
