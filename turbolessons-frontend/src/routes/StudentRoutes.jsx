import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequiredAuth } from '../helpers/SecureRoute';
import Videos from '../pages/Teachers/Videos';
import Messenger from '../pages/Students/Messenger';
import StudentLayoutWrapper from '../layouts/StudentLayoutWrapper';
import StudentDashboard from '../pages/Students/StudentDashboard';
import Library from '../pages/Students/Library';
import Payments from '../pages/Students/Payments';
import StudentProfile from '../pages/Students/StudentProfile';

// TODO: Create dedicated student components instead of reusing teacher components
// This is a placeholder until proper student components are created

const StudentRoutes = () => {
  return (
    <Routes>
      {/* Student Dashboard */}
      <Route path="/" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={StudentDashboard} />} />
      </Route>

      {/* Student Payments */}
      <Route path="/payments" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Payments} />} />
      </Route>

      {/* Student Library */}
      <Route path="/library" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Library} />} />
      </Route>

      {/* Student Videos */}
      <Route path="/videos" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Videos} />} />
      </Route>

      {/* Student Messages */}
      <Route path="/messages" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Messenger} />} />
      </Route>

      {/* Student Profile */}
      <Route path="/profile" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={StudentProfile} />} />
      </Route>
    </Routes>

  );
};

export default StudentRoutes;