import React, { useEffect } from 'react';
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

  // Dispatch custom event when authentication state changes
  useEffect(() => {
    const handleAuthStateChange = (authState) => {
      if (authState?.isAuthenticated) {
        // Dispatch a custom event that StoreProvider can listen for
        const loginEvent = new CustomEvent('okta-login-success');
        window.dispatchEvent(loginEvent);
        console.log('Auth state changed, dispatched okta-login-success event');
      }
    };

    oktaAuth.authStateManager.subscribe(handleAuthStateChange);
    
    return () => {
      oktaAuth.authStateManager.unsubscribe(handleAuthStateChange);
    };
  }, []);

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
