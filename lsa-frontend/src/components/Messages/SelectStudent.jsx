import React, { useState } from 'react';
import { InputGroup, Form } from "react-bootstrap";
import AddMessage from './AddMessage';
import MessageHistory from './MessageHistory';
export default function SelectStudent() {
    const students = [];
    //TODO Query to get student goes here  
    const [studentId, setStudentId] = useState('');
    return (
        <>
            <InputGroup>
                <Form.Control
                    as="select"
                    name='selectStudent'
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                >
                    <option value=''> Select a Student </option>
                    {students.map((option) => (
                        <option value={option._id} key={option._id}>{option.username}</option>
                    ))}
                </Form.Control>
            </InputGroup>
            <MessageHistory studentId={studentId} setStudentId={setStudentId}/>
            <AddMessage studentId={studentId} setStudentId={setStudentId}/>
        </>
    )
}