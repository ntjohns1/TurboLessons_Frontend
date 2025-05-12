import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './util/fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from './app/storeProvider';



// import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>);
// registerServiceWorker();
