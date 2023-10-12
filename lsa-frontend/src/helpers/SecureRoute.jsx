import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from './Loading';

export const RequiredAuth = ({ requiredScopes }) => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return <Loading />;

  if (!authState.isAuthenticated) {
    const originalUri = toRelativeUrl(window.location.href, window.location.origin);
    oktaAuth.setOriginalUri(originalUri);
    oktaAuth.signInWithRedirect();
    return <Loading />;
  }

  return <Outlet />;
};

