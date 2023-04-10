import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import getStore from './app/store';
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={getStore()}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>

// );

function Root() {
  return (
    <Provider store={getStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

const renderApp = () => {
  createRoot(document.getElementById('app'))
    .render(<Root />);
};

export default renderApp 
