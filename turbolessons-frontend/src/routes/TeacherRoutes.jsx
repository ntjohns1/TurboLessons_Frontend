import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequiredAuth } from '../helpers/SecureRoute';
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

// Billing components
import ManageSubscription from '../components/TeacherComponents/Billing/ManageSubscription';
import CreateStripeCustomer from '../components/TeacherComponents/Billing/CreateStripeCustomer';
import NewSubscriptionForm from '../components/TeacherComponents/Billing/CreateSubscription';

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
      <Route path="/students/:id/create_stripe_account" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={CreateStripeCustomer} />} />
      </Route>
      <Route path="/students/:id/create_subscription" element={<RequiredAuth requiredRoles={['Teacher', 'Admin']} />}>
        <Route path="" element={<TeacherLayoutWrapper component={NewSubscriptionForm} />} />
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
