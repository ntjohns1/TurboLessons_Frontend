import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequiredAuth } from '../routing/SecureRoute';
import TeacherLayoutWrapper from '../layouts/TeacherLayoutWrapper';

// Teacher components
import TeacherDashboard from '../pages/Teachers/TeacherDashboard';
import Students from '../pages/Teachers/Students';
import SingleStudent from '../components/TeacherComponents/Students/SingleStudent';
import AddStudent from '../components/TeacherComponents/Students/AddStudent';
import LessonCalendar from '../components/TeacherComponents/Lessons/LessonCalendar';
import Messenger from '../pages/Teachers/Messenger';
import Lessons from '../pages/Teachers/Lessons';
import Videos from '../pages/Teachers/Videos';

// Billing components. Enroll + manage now happen via Stripe Checkout/Portal
// inline in BillingOverview, so the create_stripe_account/create_subscription
// routes are gone.
import ManageSubscription from '../components/TeacherComponents/Billing/ManageSubscription';

const TeacherRoutes = () => {
  return (
    <Routes>
      {/* Teacher Dashboard */}
      <Route path="/" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={TeacherDashboard} />} />
      </Route>
      
      {/* Student Management Routes */}
      <Route path="/students" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={Students} />} />
      </Route>
      <Route path="/students/:id" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={SingleStudent} />} />
      </Route>
      <Route path="/students/:id/subscription" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={ManageSubscription} />} />
      </Route>
      <Route path="/addStudent" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={AddStudent} />} />
      </Route>
      
      {/* Teacher Feature Routes */}
      <Route path="/calendar" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={LessonCalendar} />} />
      </Route>
      <Route path="/messages" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={Messenger} />} />
      </Route>
      <Route path="/lessons" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={Lessons} />} />
      </Route>
      <Route path="/videos" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={Videos} />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
