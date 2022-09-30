import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from '@components/App';
import store from '@app/store';
import '@assets/styles/main.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root');
}

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
