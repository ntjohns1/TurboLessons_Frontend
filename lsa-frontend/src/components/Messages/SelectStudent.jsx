import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import SendMessage from './SendMessage';
import { useStudentContext } from '../../util/context/StudentContext';
export default function SelectStudent() {

    const { students } = useStudentContext();
    const [sendTo, setSendTo] = useState('');

    const handleChange = async (e) => {
        setSendTo(e.target.value);
        console.log(sendTo);
    };

    return (
        <>
            <Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Select
                        name='selectStudent'
                        value={sendTo}
                        onChange={handleChange}
                    >
                        <option value=''> Select a Student </option>
                        {students && students.map((option, index) => (
                            <option value={option.id} key={index}>{option.displayName}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form.Group>
            <SendMessage sendTo={sendTo} />
        </>
    )
}
