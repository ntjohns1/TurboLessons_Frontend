import React, { useState, useEffect, useContext } from 'react';
import { InputGroup, Form, Card, Toast } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import AddMessage from './AddMessage';
import Messages from './Messages';
import { useStomp } from '../../util/context/StompContext';
export default function SelectStudent() {

    // const [client, setClient] = useState(null);
    const { client, chatUserList, inMessage } = useStomp();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principle = authState.idToken.claims.preferred_username;
    const principleId = authState.idToken.claims.sub;




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
            <Messages client={client} chatUserList={chatUserList} inMessage={inMessage} />
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