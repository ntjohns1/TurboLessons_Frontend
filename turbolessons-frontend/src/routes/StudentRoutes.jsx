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
      {/* Student Dashboard */}
      <Route path="/student" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<Videos />} />
      </Route>
      
      {/* Student Features */}
      <Route path="/student/videos" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<Videos />} />
      </Route>
      
      {/* Shared Features */}
      <Route path="/student/messages" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<Messenger />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;