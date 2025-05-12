import React from 'react';
import logo from './icons/TurboLessonsLogo_White.svg';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

export default function NavLogo() {
  const { authState } = useOktaAuth();
  const isTeacher = authState?.accessToken?.claims?.groups.includes('Teacher', 'Admin');
  return (
    <Link to={isTeacher ? '/teacher_portal' : '/student_portal'}>
      <img src={logo} alt="Main Logo" style={{ width: '80%' }}  className='py-3'/>
    </Link>
  )
}
