import React from 'react';
import logo from './icons/TurboLessonsLogo_White.svg';
import { Link } from 'react-router-dom';

export default function NavLogo() {
  return (
    <Link to={'/'}>
      <img src={logo} alt="Main Logo" style={{ width: '80%' }}  className='py-3'/>
    </Link>
  )
}
