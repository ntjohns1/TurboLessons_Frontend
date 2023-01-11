import React from 'react';
import { Card, Toast, Button } from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import Messages from './Messages';
import { useStomp } from '../../util/context/StompContext';
export default function SelectStudent() {

    // const [client, setClient] = useState(null);
    const { 
        sClient, 
        chatUserList, 
        // connectStomp,
        disconnect,
        inMessage, 
        principle,
        stompSubscribe,
        stompClientSendMessage } = useStomp();
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
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
                <Card.Footer>
                    {/* <Button className='m-3' onClick={()=>connectStomp()}>connect</Button> */}
                    <Button className='m-3' onClick={()=>disconnect(sClient,principle)}>connect</Button>
                </Card.Footer>
            </Card>
            <Messages chatUserList={chatUserList} inMessage={inMessage} />
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