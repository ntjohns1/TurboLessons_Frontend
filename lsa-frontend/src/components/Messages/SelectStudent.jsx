import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import SendMessage from './SendMessage';
import DisplayMessages from './DisplayMessages';
import { useStudentContext } from '../../util/context/StudentContext';

export default function SelectStudent() {
  const { students } = useStudentContext();
  const [sendTo, setSendTo] = useState('');
  const [updtateOutMessages, setUpdtateOutMessages] = useState(false);

  const handleChange = async (e) => {
    const selectedId = e.target.value;
    setSendTo(selectedId);
  };

  return (
    <>
      <Form.Group>
        <Form.Group className='mb-3'>
          <Form.Select name='selectStudent' value={sendTo} onChange={handleChange} >
            <option value=''> Select a Student </option>
            {students && students.map((option, index) => (
              <option value={option.id} key={index}>{option.displayName}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form.Group>
      <DisplayMessages sendTo={sendTo} updtateOutMessages={updtateOutMessages} />
      <SendMessage sendTo={sendTo} setUpdtateOutMessages={setUpdtateOutMessages} />
    </>
  )
}
