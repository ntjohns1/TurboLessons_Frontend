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
import TeacherDashboard from './pages/Teachers/TeacherDashboard';
import Students from "./pages/Teachers/Students"
import AddStudent from "./components/TeacherComponents/Students/AddStudent"
import { RequiredAuth } from "./helpers/SecureRoute";
import SingleStudent from './components/TeacherComponents/Students/SingleStudent';
import Messenger from './pages/Teachers/Messenger';
import Lessons from './pages/Teachers/Lessons'
import Videos from './pages/Teachers/Videos';
import Unauthorized from './helpers/Unauthorized';
import LessonCalendar from './components/TeacherComponents/Lessons/LessonCalendar.jsx';
import TeacherLayoutWrapper from './layouts/TeacherLayoutWrapper'
import './App.css';
import ManageSubscription from './components/TeacherComponents/Billing/ManageSubscription.jsx';
import CreateStripeCustomer from './components/TeacherComponents/Billing/CreateStripeCustomer.jsx';
import NewSubscriptionForm from './components/TeacherComponents/Billing/CreateSubscription.jsx';


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
            
            {/* Teacher Dashboard - accessible by Teachers and Admins */}
            <Route path="/" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={TeacherDashboard} />} />
            </Route>
            
            {/* Student Management Routes - accessible by Teachers and Admins */}
            <Route path="/students" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={Students} />} />
            </Route>
            <Route path="/students/:id" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={SingleStudent} />} />
            </Route>
            <Route path="/students/:id/subscription" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={ManageSubscription} />} />
            </Route>
            <Route path="/students/:id/create_stripe_account" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={CreateStripeCustomer} />} />
            </Route>
            <Route path="/students/:id/create_subscription" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={NewSubscriptionForm} />} />
            </Route>
            <Route path="/addStudent" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={AddStudent} />} />
            </Route>
            <Route path="/calendar" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={LessonCalendar} />} />
            </Route>
            <Route path="/messages" element={<RequiredAuth requiredRoles={['Teacher', 'Admin', 'Student']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={Messenger} />} />
            </Route>
            <Route path="/lessons" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={Lessons} />} />
            </Route>
            <Route path="/videos" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
              <Route path="" element={<TeacherLayoutWrapper component={Videos} />} />
            </Route>
            
            {/* Student Views - accessible by Students, Teachers, and Admins */}
            <Route path="/studentHome" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
              <Route path="" element={<Videos />} />
            </Route>
            
            <Route path="/unauthorized" element={<RequiredAuth />}>
              <Route path="" element={<Unauthorized />} />
            </Route>
          </Routes>
        </Elements>
      </WebSocketProvider>
    </Security>
  );
};
export default App;
