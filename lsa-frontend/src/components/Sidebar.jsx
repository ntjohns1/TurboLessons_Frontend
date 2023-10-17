import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import { useSocket } from "../util/context/WebSocketContext";

import '../App'

const sidebarItems = [
  { to: "/portal", label: "Portal" },
  { to: "/students", label: "Manage Students" },
  { to: "/schedule", label: "Manage Schedule" },
  { to: "/calendar", label: "Calendar" },
  { to: "/messages", label: "Messages" },
];

export default function Sidebar() {

  const { authState, oktaAuth } = useOktaAuth();
  const { disconnectSocket } = useSocket();
  const logout = async () => {
    await disconnectSocket();
    oktaAuth.signOut();
  };

  return (
    <Nav
      className="flex-column py-4 d-flex"
      style={{ justifyContent: 'space-between' }}
    >
      <div>
        {sidebarItems.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              as={NavLink}
              to={item.to}
              className="navLinkWhite"
            >
              {item.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </div>
      <Nav.Item>
        {oktaAuth.isAuthenticated && (
          <Nav.Link 
          onClick={logout}
          className="navLinkWhite"
          >
            Logout
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}
