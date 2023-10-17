import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import NavLogo from "../util/NavLogo";
import '../App'

const sidebarItems = [
  { to: "/portal", label: "Portal" },
  { to: "/students", label: "Manage Students" },
  { to: "/schedule", label: "Manage Schedule" },
  { to: "/calendar", label: "Calendar" },
  { to: "/messages", label: "Messages" },
];

export default function Sidebar() {
  return (
    <Nav
      className="flex-column py-4"
      style={{ height:'90vh' }}
    >
      {sidebarItems.map((item, index) => (
        <Nav.Item key={index}>
          <Nav.Link
            as={NavLink}
            to={item.to}
            activeClassName="active"
            className="navLinkWhite"
          >
            {item.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

