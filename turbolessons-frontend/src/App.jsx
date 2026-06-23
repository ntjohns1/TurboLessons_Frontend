import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, AuthCallback } from '@ntjohns1/react-oidc';
import LoadingSpinner from './components/common/LoadingSpinner';
import config from './config';
import MessageStreamSubscriber from "./components/MessageStreamSubscriber";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
import { RequiredAuth } from "./routing/SecureRoute.jsx";
import UnauthorizedState from './components/common/UnauthorizedState';
import './App.css';
import TeacherRoutes from './routes/TeacherRoutes';
import StudentRoutes from './routes/StudentRoutes';
import RoleRouter from './components/RoleRouter';

const stripePromise = loadStripe(config.oidc.stripeApiKey);

const App = () => {
  const navigate = useNavigate();

  // Restore the original route after the redirect login, and notify the store.
  const onSigninCallback = (user) => {
    window.dispatchEvent(new CustomEvent('okta-login-success'));
    const returnTo = (user && typeof user.state === 'string' && user.state) || '/';
    navigate(returnTo, { replace: true });
  };

  return (
    <AuthProvider config={{ ...config.oidc, onSigninCallback }}>
      <MessageStreamSubscriber />
      <Elements stripe={stripePromise}>
        <Routes>
            <Route path="login/callback" element={<AuthCallback loading={<LoadingSpinner />} />} />

            {/* Root path - will redirect based on user role */}
            <Route path="/" element={<RequiredAuth />}>
              <Route path="" element={<RoleRouter />} />
            </Route>

            <Route path="/unauthorized" element={<RequiredAuth />}>
              <Route path="" element={<UnauthorizedState />} />
            </Route>

            {/* Include Teacher and Student Routes */}
            {/* Teacher Routes */}
            <Route path="/teacher_portal/*" element={<TeacherRoutes />} />

            {/* Student Routes */}
            <Route path="/student_portal/*" element={<StudentRoutes />} />
          </Routes>
      </Elements>
    </AuthProvider>
  );
};
export default App;
