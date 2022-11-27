import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Card, Button } from "react-bootstrap";
import PortalNav from '../components/PortalNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();
  const loggedStatus = oktaAuth.isAuthenticated();
  const login = async () => oktaAuth.signInWithRedirect();
  return (
    <Container>
      {loggedStatus && (
        <PortalNav />
      )}
      <Card.Body>
        <h1 className="text-center">Welcome to <FontAwesomeIcon icon={"play-circle"} /> Music Notes</h1>
        <p className="text-center">An interactive platform for music teachers and students to communicate helpful information.</p>
        {!loggedStatus && (
          <Button variant="primary" size="lg" onClick={login}>
            Login
          </Button>
        )}
      </Card.Body>
    </Container>
  )
};