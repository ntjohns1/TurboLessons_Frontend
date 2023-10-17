import React from "react";
import logo from '../util/icons/Profile Icon_Yellow.svg';


const Header = () => {

  return (

      <div style={{ height: '10vh', width: '100%' }} className="d-flex justify-content-end">
              <img src={logo} alt="Main Logo" style={{ width: '80%' }}  className='py-3'/>
      </div>
  );
};

export default Header;