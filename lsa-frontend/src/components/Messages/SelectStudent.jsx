import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import SendMessage from './SendMessage';
import DisplayMessages from './DisplayMessages';
import { useStudentContext } from '../../util/context/StudentContext';

export default function SelectStudent() {
  const { students } = useStudentContext();
  const [sendTo, setSendTo] = useState('');
  // const [updateOutMessages, setUpdateOutMessages] = useState(false);
  const [updateOutMessages, setUpdateOutMessages] = useState({});


  const handleChange = async (e) => {
    const selectedUser = e.target.value;
    setSendTo(selectedUser);
  };

  return (
    <>
      <Form.Group>
        <Form.Group className='mb-3'>
          <Form.Select name='selectStudent' value={sendTo} onChange={handleChange} >
            <option value=''> Select a Student </option>
            {students && students.map((option) => (
              <option value={option.displayName} key={option.id}>{option.displayName}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form.Group>
      <DisplayMessages sendTo={sendTo} updateOutMessages={updateOutMessages} />
      <SendMessage sendTo={sendTo} setUpdateOutMessages={setUpdateOutMessages} />
    </>
  )
}
