/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { LoginCallback } from '@okta/okta-react';
import Loading from './helpers/Loading';
import config from './config';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeNav from "./components/Nav";
import WelcomePage from "./pages/Homepage";
import SecuredPage from "./pages/Securedpage";
import Portal from "./pages/Portal"
import Students from "./pages/Students"
import { RequiredAuth } from "./helpers/SecureRoute";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
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
      </Routes>
    </Security>
  );
};
export default App;
