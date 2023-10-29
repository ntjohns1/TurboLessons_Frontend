import { useOktaAuth } from '@okta/okta-react';

const PrivateRoute = ({ children }) => {
 const { auth } = useOktaAuth();

 const isLoggedIn = auth.isAuthenticated;

 return isLoggedIn ? children : null;
};

export default PrivateRoute;