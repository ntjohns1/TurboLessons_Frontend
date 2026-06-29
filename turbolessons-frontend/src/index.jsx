import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './util/fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from './app/storeProvider';
import { unregister } from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>);

// We don't ship a service worker, but older CRA builds did. Actively unregister
// any lingering service worker (and its caches) so it can't serve stale assets
// or intercept API calls — the cause of the "no internet"/offline weirdness.
unregister();
