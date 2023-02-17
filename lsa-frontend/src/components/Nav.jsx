import React from "react";
import { useOktaAuth } from '@okta/okta-react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useStomp } from "../util/context/StompContext";

const HomeNav = () => {


  const { authState, oktaAuth } = useOktaAuth();
  const { sClient, principle, disconnect } = useStomp();
  const logout = async () => {
    await disconnect(sClient,principle);
    oktaAuth.signOut();
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        sticky='top'
        expand='lg'
        variant='dark'
        className='mb-3'
        style={{ backgroundColor: '#00334E' }}>
        <Navbar.Brand className='header-nav px-3'>
          Lesson Schedule Service
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav
            className='ms-auto px-3'>
            <Nav.Link style={{ color: 'white' }} as={Link} to='/'>
              Home
            </Nav.Link>
            {oktaAuth.isAuthenticated && (
              <Nav.Link style={{ color: 'white' }} onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default HomeNav;