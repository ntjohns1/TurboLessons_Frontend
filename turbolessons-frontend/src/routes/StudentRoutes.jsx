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
      <Route path="/student_portal" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={StudentDashboard} />} />
      </Route>

      {/* Student Payments */}
      <Route path="/student_portal/payments" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Payments} />} />
      </Route>

      {/* Student Library */}
      <Route path="/student_portal/library" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Library} />} />
      </Route>

      {/* Student Videos */}
      <Route path="/student_portal/videos" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Videos} />} />
      </Route>

      {/* Student Messages */}
      <Route path="/student_portal/messages" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={Messenger} />} />
      </Route>

      {/* Student Profile */}
      <Route path="/student_portal/profile" element={<RequiredAuth requiredRoles={['Student', 'Teacher', 'Admin']} />}>
        <Route path="" element={<StudentLayoutWrapper component={StudentProfile} />} />
      </Route>
    </Routes>

  );
};

export default StudentRoutes;