import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Card, Button } from "react-bootstrap";
import '../../util/fonts/fonts.css'
import HomeLogo from '../../util/HomeLogo';

export default function TeacherHome() {
  const { authState, oktaAuth } = useOktaAuth();

  const userGroups = authState?.accessToken?.claims?.groups || [];

  const isTeacher = userGroups.includes('Teacher', 'Admin');

  const login = async () => oktaAuth.signInWithRedirect();

  // const getTokenInfo = () => {
  //   if (authState && authState.isAuthenticated) {
  //     const { accessToken } = authState;
  //     if (accessToken && accessToken.claims) {
  //       // Log the scopes
  //       console.log('Groups:', accessToken.claims.groups);
  //       // You can also log the entire payload of the token
  //       console.log('Token Payload:', accessToken.claims);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   getTokenInfo();
  // }, [authState]);

  return (
    <Container>
      {isTeacher && authState && authState.isAuthenticated && (
        <PortalNav />
      )}
      <Card.Body className='d-flex justify-content-center'>
        <HomeLogo />
        {/* <h1 style={{ fontFamily: 'Saira-Italic-900' }} className="text-center">TURBO LESSONS</h1> */}

      </Card.Body>
      <Card.Body>
        <p className="text-center ">Turbo Charge Your Lessons!!!</p>
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