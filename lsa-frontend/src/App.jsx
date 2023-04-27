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
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./components/Lessons/Securedpage"
import Portal from "./pages/Portal"
import Students from "./pages/Students"
import AddStudent from "./components/Students/AddStudent"
import { RequiredAuth } from "./helpers/SecureRoute";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import SingleStudent from './components/Students/SingleStudent';
import Messenger from './pages/Messenger';

library.add(fas);

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
            <Route path="/secured" element={<RequiredAuth />}>
              <Route path="" element={<SecuredPage />} />
            </Route>
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
            <Route path="/messenger" element={<RequiredAuth />}>
              <Route path="" element={<Messenger />} />
            </Route>
          </Routes>
        </WebSocketProvider>
      </StudentProvider>
    </Security>
  );
};
export default App;
