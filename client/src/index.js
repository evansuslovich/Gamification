


import renderApp from './Root';
import getStore from './app/store';
import { authApi } from './app/services/api/authApi';
import { saveCsrfToken } from './app/services/csrfToken';
import { setUser } from './app/services/slices/authSlice';

// gets the store from store.js
// dispatches the current query from userApi
// renders app from App.js (holds all the routing)

async function initializeApp() {
  const store = getStore();
  saveCsrfToken();
  const response = await store.dispatch(authApi.endpoints.profile.initiate());
  await store.dispatch(setUser(response.data));
  renderApp();

}

initializeApp();