import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Card, Button } from "react-bootstrap";
import PortalNav from '../components/PortalNav';

export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      console.log(oktaAuth.getAccessToken);
    }
  }, [authState, oktaAuth]);

  return (
    <Container>
      {authState && authState.isAuthenticated && (
        <PortalNav />
      )}
      <Card.Body>
        <h1 className="text-center">Welcome to TurboLessons!!!</h1>
        <p className="text-center">Turbo Charge Your Lessons!!!</p>
      </Card.Body>
      {authState && !authState.isAuthenticated && (
        <Card.Footer className='text-center'>
          <Button variant="primary" size="lg" onClick={login}>
            Login
          </Button>
        </Card.Footer>
      )}
    </Container>
  )
};