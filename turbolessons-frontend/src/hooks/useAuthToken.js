import { useOktaAuth } from '@ntjohns1/react-oidc/okta-compat';
import { useEffect } from 'react';
import { setAccessToken } from '../service/axiosConfig';

export const useAuthToken = () => {
  const { authState, oktaAuth } = useOktaAuth();
  
  useEffect(() => {
    if (authState?.isAuthenticated) {
      const token = oktaAuth.getAccessToken();
      setAccessToken(token);
    }
  }, [authState, oktaAuth]);
  
  return { authState, oktaAuth };
};