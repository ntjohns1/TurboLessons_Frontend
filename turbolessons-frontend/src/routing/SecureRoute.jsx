import React, { useEffect } from 'react';
import { useAuth } from '@ntjohns1/react-oidc';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import LoadingSpinner from '../components/common/LoadingSpinner';

export const RequiredAuth = ({ requiredRoles = [] }) => {
  const { isAuthenticated, isLoading, login, hasRole } = useAuth();
  const location = useLocation();

  // Kick off an interactive login once we know the user is unauthenticated.
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const returnTo = window.location.pathname + window.location.search;
      login(returnTo);
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading || !isAuthenticated) return <LoadingSpinner />;

  // Role-based access control (roles/groups resolved from the configured claim).
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => hasRole(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return <Outlet />;
};
