import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import Loading from './Loading';

export const RequiredAuth = ({ requiredRoles = [] }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const location = useLocation();

  if (!authState) return <Loading />;

  if (!authState.isAuthenticated) {
    const originalUri = toRelativeUrl(window.location.href, window.location.origin);
    oktaAuth.setOriginalUri(originalUri);
    oktaAuth.signInWithRedirect();
    return <Loading />;
  }

  // Role-based access control
  if (requiredRoles && requiredRoles.length > 0) {
    // Get user's groups from the token claims
    const userGroups = authState.accessToken?.claims?.groups || [];
    console.log('User groups:', userGroups);
    
    // Check if user has at least one of the required roles
    const hasRequiredRole = requiredRoles.some(role => userGroups.includes(role));
    
    if (!hasRequiredRole) {
      // User doesn't have the required role, redirect to unauthorized page
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return <Outlet />;
};
