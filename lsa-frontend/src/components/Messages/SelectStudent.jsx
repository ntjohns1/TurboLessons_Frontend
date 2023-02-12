import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
// import Messages from './Messages';
import AddMessage from './AddMessage';
import { useSocket } from '../../util/context/WebSocketContext';
export default function SelectStudent() {

    const { chatUserList } = useSocket();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principleId = authState.idToken.claims.sub;
    const [sendTo, setSendTo] = useState('');

    const handleChange = async (e) => {
        setSendTo(e.target.value)
    };

    return (
        <>
            <Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        as="select"
                        name='selectStudent'
                        value={sendTo}
                        onChange={handleChange}
                    >
                    </Form.Control>
                    <Form.Select>
                        <option value=''> Select a Student </option>
                        {chatUserList && chatUserList.map((option, index) => (
                            <option value={option} key={index}>{option}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Form.Group>
            {/* <Messages sendTo={sendTo} /> */}
            <AddMessage/>
        </>
    )
}
