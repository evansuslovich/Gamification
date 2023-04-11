import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import getStore from './app/store';
import App from './App'
import { SnackbarProvider } from "notistack";


import { BrowserRouter } from 'react-router-dom';


function Root() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2500}>
      <Provider store={getStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>
  )
}

const renderApp = () => {
  createRoot(document.getElementById('root'))
    .render(<Root />);
};

export default renderApp;