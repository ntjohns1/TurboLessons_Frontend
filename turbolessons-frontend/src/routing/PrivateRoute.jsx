import { useOktaAuth } from '@ntjohns1/react-oidc/okta-compat';

const PrivateRoute = ({ children }) => {
 const { auth } = useOktaAuth();

 const isLoggedIn = auth.isAuthenticated;

 return isLoggedIn ? children : null;
};

export default PrivateRoute;
