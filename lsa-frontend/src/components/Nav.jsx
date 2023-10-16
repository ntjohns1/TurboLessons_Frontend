import React from "react";
import { useOktaAuth } from '@okta/okta-react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useSocket } from "../util/context/WebSocketContext";
import NavLogo from "../util/NavLogo";

const HomeNav = () => {


  const { authState, oktaAuth } = useOktaAuth();
  const { principle, disconnectSocket } = useSocket();
  const logout = async () => {
    await disconnectSocket();
    oktaAuth.signOut();
  };

  return (

      <Navbar
        collapseOnSelect
        // sticky='top'
        expand='lg'
        variant='dark'
        className='mb-3'
        >
        {/* <Navbar.Brand className='header-nav px-3'>
          <NavLogo />
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav
            className='ms-auto px-3'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            {oktaAuth.isAuthenticated && (
              <Nav.Link onClick={logout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );
};

export default HomeNav;