import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import SendMessage from './SendMessage';
import DisplayMessages from './DisplayMessages';

export default function SelectUser() {
  // Dummy data for teachers
  const dummyTeachers = [
    { id: 1, displayName: 'John Smith', email: 'john.smith@example.com' },
    { id: 2, displayName: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
    { id: 3, displayName: 'Michael Brown', email: 'michael.brown@example.com' }
  ];
  
  // Local state for selected teacher
  const [selectedUser, setSelectedUser] = useState('');

  const handleChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <>
      <Form.Group>
        <Form.Group className='mb-3'>
          <Form.Select 
            name='selectUser' 
            value={selectedUser} 
            onChange={handleChange}
          >
            <option value=''> Select a Teacher </option>
            {dummyTeachers.map((teacher) => (
              <option value={teacher.displayName} key={teacher.id}>
                {teacher.displayName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form.Group>
    </>
  );
}