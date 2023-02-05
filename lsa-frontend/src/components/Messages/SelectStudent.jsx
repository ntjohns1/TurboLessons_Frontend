import React, { useState } from 'react';
import { Card, Toast, Form } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import Messages from './Messages';
import { useStomp } from '../../util/context/StompContext';
export default function SelectStudent() {

    // const [client, setClient] = useState(null);
    const {
        sClient,
        chatUserList,
        disconnect,
        inMessage,
        principle } = useStomp();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principleId = authState.idToken.claims.sub;
    const [sendTo, setSendTo] = useState('');

    const handleChange = async (e) => {
        setSendTo(e.target.value)
    };

    return (
        <>
            <Card>
                <Card.Header>
                    <h4>Currently Online</h4>
                </Card.Header>
                <Card.Body>
                    {chatUserList && chatUserList.map((student, index) => (
                        // <Toast onClick={() => goToStudent(student.id)} key={index}>
                        <Toast key={index}>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">{student}</strong>
                            </Toast.Header>
                        </Toast>
                    ))}
                </Card.Body>
            </Card>
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
            <Messages sendTo={sendTo}/>
            {/* <AddMessage studentId={studentId} setStudentId={setStudentId}/> */}
        </>
    )
}
// stompClient.subscribe(`/user/${message.sender}/msg`, function (m) {
//     console.log(m);
//     let msg = JSON.parse(m.body);
//     console.log(messages);
//     setMessages(prevMessages => [
//         ...prevMessages,
//         { sender: msg.sender, to: msg.to, text: msg.text, time: msg.time }
//     ]);
// });