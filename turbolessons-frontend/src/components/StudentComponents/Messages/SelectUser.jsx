import React from 'react';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import SendMessage from './SendMessage';
import DisplayMessages from './DisplayMessages';
import { setSelectedStudent, selectSelectedStudent } from './StudentMessageSlice';

export default function SelectUser() {
  const students = useSelector((state) => state.students.studentsByTeacher);
  const selectedUser = useSelector(selectSelectedStudent);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const selectedUser = e.target.value;
    dispatch(setSelectedStudent(selectedUser));
  };

  return (
    <>
      <Form.Group>
        <Form.Group className='mb-3'>
          <Form.Select 
            name='selectUser' 
            value={selectedUser || ''} 
            onChange={handleChange}
          >
            <option value=''> Select a User </option>
            {students && students.map((option) => (
              <option value={option.displayName} key={option.id}>
                {option.displayName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form.Group>
      <DisplayMessages sendTo={selectedUser} />
      <SendMessage />
    </>
  );
}
