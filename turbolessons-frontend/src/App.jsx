import React from 'react';

import { useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { LoginCallback } from '@okta/okta-react';
import Loading from './helpers/Loading';
import config from './config';
import { StudentProvider } from './util/context/StudentContext';
import { WebSocketProvider } from "./util/context/WebSocketContext.jsx";
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
import Calendar from './components/TeacherComponents/Lessons/Calendar';
import TeacherLayoutWrapper from './layouts/TeacherLayoutWrapper'
import './App.css';
import Subscription from './components/TeacherComponents/Billing/Subscription.jsx';


const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <StudentProvider>
        <WebSocketProvider>
          <Routes>
            <Route path="login/callback" element={<LoginCallback loadingElement={<Loading />} />} />
            <Route path="/" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={TeacherDashboard} />} />
            </Route>
            <Route path="/students" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={Students} /> } />
            </Route>
            <Route path="/students/:id" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={SingleStudent} />} />
            </Route>
            <Route path="/billing" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={Subscription} />} />
            </Route>
            <Route path="/addStudent" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={AddStudent} />} />
            </Route>
            <Route path="/calendar" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={Calendar} />} />
            </Route>
            <Route path="/messages" element={<RequiredAuth />}>
            <Route path="" element={<TeacherLayoutWrapper component={Messenger} /> } />
            </Route>
            <Route path="/lessons" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={Lessons} />} />
            </Route>
            <Route path="/videos" element={<RequiredAuth />}>
              <Route path="" element={<TeacherLayoutWrapper component={Videos} />} />
            </Route>
            <Route path="/studentHome" element={<RequiredAuth />}>
              <Route path="" element={<Videos />} />
            </Route>
            <Route path="/unauthorized" element={<RequiredAuth />}>
              <Route path="" element={<Unauthorized />} />
            </Route>
          </Routes>
        </WebSocketProvider>
      </StudentProvider>
    </Security>
  );
};
export default App;
