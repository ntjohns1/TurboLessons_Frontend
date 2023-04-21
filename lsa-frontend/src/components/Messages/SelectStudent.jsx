import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import Messages from './Messages';
import { useStudentContext } from '../../util/context/StudentContext';
export default function SelectStudent() {

    const { students } = useStudentContext();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principleId = authState.idToken.claims.sub;
    const [sendTo, setSendTo] = useState('');

    const handleChange = async (e) => {
        setSendTo(e.target.value);
        console.log(sendTo);
    };

    return (
        <>
            <Form.Group>
                <Form.Group className='mb-3'>
                    {/* <Form.Control
                        as="select"
                        name='selectStudent'
                        value={sendTo}
                        onChange={handleChange}
                    >
                    </Form.Control>
                    <Form.Select>
                        <option value=''> Select a Student </option>
                        {students && students.map((option, index) => (
                            <option value={option.id} key={index}>{option.displayName}</option>
                        ))}
                    </Form.Select> */}
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
            <Messages sendTo={sendTo} />
            {/* <AddMessage/> */}
        </>
    )
}
