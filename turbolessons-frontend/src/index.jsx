import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './util/fonts/fonts.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './app/store';
import { Provider } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from './config';

const stripePromise = loadStripe(config.oidc.stripeApiKey);


// import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </BrowserRouter>);
// registerServiceWorker();
