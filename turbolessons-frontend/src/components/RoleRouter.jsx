import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../helpers/Loading';

const RoleRouter = () => {
  const { authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      // Get user's groups from the token claims
      const userGroups = authState.accessToken?.claims?.groups || [];
      console.log('User groups for routing:', userGroups);

      // Determine where to redirect based on user role
      if (userGroups.includes('Teacher') || userGroups.includes('Admin')) {
        // Teacher or Admin - go to teacher dashboard
        navigate('/teacher');
      } else if (userGroups.includes('Student')) {
        // Student - go to student dashboard
        navigate('/student');
      } else {
        // No recognized role - go to unauthorized page
        navigate('/unauthorized');
      }
    }
  }, [authState, navigate]);

  // Show loading while checking auth state and redirecting
  return <Loading />;
};

export default RoleRouter;
