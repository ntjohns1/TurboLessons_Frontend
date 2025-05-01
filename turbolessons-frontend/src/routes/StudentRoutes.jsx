import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequiredAuth } from '../helpers/SecureRoute';
import Videos from '../pages/Teachers/Videos';
import Messenger from '../pages/Teachers/Messenger';

// TODO: Create dedicated student components instead of reusing teacher components
// This is a placeholder until proper student components are created

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/student_portal" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<Videos />} />
      </Route>
      

      <Route path="/student_portal/videos" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<Videos />} />
      </Route>
      

      <Route path="/student_portal/messages" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<Messenger />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;