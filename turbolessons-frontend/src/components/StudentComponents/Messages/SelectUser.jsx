import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Form } from "react-bootstrap";
import { fetchStudentData, setTeachers, extractTeachers } from '../Dashboard/StudentDashboardSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function SelectUser() {
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();

  // Local state for selected teacher
  const [selectedUser, setSelectedUser] = useState('');
  
  // Fetch student data when component mounts
  useEffect(() => {
    if (authState?.idToken?.claims?.sub) {
      dispatch(fetchStudentData({ id: authState.idToken.claims.sub }));
    }
  }, [dispatch, authState]);

  // Extract teachers from auth groups and update Redux store
  useEffect(() => {
    if (authState?.accessToken?.claims?.groups) {
      const teacherUsernames = extractTeachers(authState.accessToken.claims.groups);
      console.log('Teacher usernames:', teacherUsernames);
      dispatch(setTeachers(teacherUsernames));
    }
  }, [authState, dispatch]);

  const teachers = useSelector((state) => state.studentDashboard.teachers || []);

  const handleChange = (e) => {
    console.log('Selected teacher:', e.target.value);
    setSelectedUser(e.target.value);
  };

  return (
    <div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Select
            name='selectUser'
            value={selectedUser || ''}
            onChange={handleChange}
          >
            <option value=''> Select a Teacher </option>
            {teachers.map((teacherUsername, index) => (
              <option value={teacherUsername} key={index}>
                {teacherUsername}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );
}