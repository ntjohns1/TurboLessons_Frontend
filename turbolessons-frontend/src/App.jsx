import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { LoginCallback } from '@okta/okta-react';
import Loading from './helpers/Loading';
import config from './config';
import { WebSocketProvider } from "./util/context/WebSocketContext.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import { RequiredAuth } from "./helpers/SecureRoute";
import Unauthorized from './helpers/Unauthorized';
import './App.css';
import TeacherRoutes from './routes/TeacherRoutes';
import StudentRoutes from './routes/StudentRoutes';
import RoleRouter from './components/RoleRouter';

const oktaAuth = new OktaAuth(config.oidc);
const stripePromise = loadStripe(config.oidc.stripeApiKey);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <WebSocketProvider>
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="login/callback" element={<LoginCallback loadingElement={<Loading />} />} />
            
            {/* Root path - will redirect based on user role */}
            <Route path="/" element={<RequiredAuth />}>
              <Route path="" element={<RoleRouter />} />
            </Route>

            <Route path="/unauthorized" element={<RequiredAuth />}>
              <Route path="" element={<Unauthorized />} />
            </Route>
          </Routes>
          <TeacherRoutes />
          <StudentRoutes />
        </Elements>
      </WebSocketProvider>
    </Security>
  );
};
export default App;
