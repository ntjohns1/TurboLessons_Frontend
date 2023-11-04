import React from "react";
import { Stack } from "react-bootstrap";
import logo from '../../util/icons/Profile Icon_Yellow.svg';


const Header = () => {

  return (

    <Stack direction="horizontal" gap={3} style={{ height: '10vh' }} >
      <h2 className="p-2">Dashboard</h2>
      <div className="p-2 ms-auto">
        <img src={logo} alt="Profile Icon" style={{ height: '7vh' }}  />
      </div>
    </Stack>


  );
};

export default Header;