import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Card, Button } from "react-bootstrap";
import PortalNav from '../components/PortalNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStomp } from '../util/context/StompContext';


export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();

  return (
    <Container>
      {authState && authState.isAuthenticated && (
        <PortalNav />
      )}
      <Card.Body>
        <h1 className="text-center">Welcome to <FontAwesomeIcon icon={"play-circle"} /> Music Notes</h1>
        <p className="text-center">An interactive platform for music teachers and students to communicate helpful information.</p>
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