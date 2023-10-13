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
import HomeNav from "./components/Nav";
import WelcomePage from "./pages/Teachers/TeacherHome";
import Portal from "./pages/Teachers/Portal"
import Students from "./pages/Teachers/Students"
import AddStudent from "./components/TeacherComponents/Students/AddStudent"
import { RequiredAuth } from "./helpers/SecureRoute";
import SingleStudent from './components/TeacherComponents/Students/SingleStudent';
import Messenger from './pages/Teachers/Messenger';
import Lessons from './pages/Teachers/Lessons'
import Videos from './pages/Teachers/Videos';
import Unauthorized from './helpers/Unauthorized';
import Calendar from './components/TeacherComponents/Lessons/Calendar';

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
          <HomeNav />
          <Routes>
            <Route exact path="/" element={<WelcomePage />} />
            <Route path="login/callback" element={<LoginCallback loadingElement={<Loading />} />} />
            <Route path="/portal" element={<RequiredAuth />}>
              <Route path="" element={<Portal />} />
            </Route>
            <Route path="/students" element={<RequiredAuth />}>
              <Route path="" element={<Students />} />
            </Route>
            <Route path="/students/:id" element={<RequiredAuth />}>
              <Route path="" element={<SingleStudent />} />
            </Route>
            <Route path="/addStudent" element={<RequiredAuth />}>
              <Route path="" element={<AddStudent />} />
            </Route>
            <Route path="/calendar" element={<RequiredAuth />}>
              <Route path="" element={<Calendar />} />
            </Route>
            <Route path="/messenger" element={<RequiredAuth />}>
              <Route path="" element={<Messenger />} />
            </Route>
            <Route path="/lessons" element={<RequiredAuth />}>
              <Route path="" element={<Lessons />} />
            </Route>
            <Route path="/videos" element={<RequiredAuth />}>
              <Route path="" element={<Videos />} />
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
