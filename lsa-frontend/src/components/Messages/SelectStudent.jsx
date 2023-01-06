import React, { useState, useEffect, useContext } from 'react';
import { InputGroup, Form, Card , Toast} from "react-bootstrap";
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import AddMessage from './AddMessage';
import Messages from './Messages';
import StompContext from '../../util/context/StompContext';
export default function SelectStudent() {

    // const [client, setClient] = useState(null);
    const { stompClient } = useContext(StompContext);
    const [userList, setUserList] = useState([]);
    const { authState, oktaAuth } = useOktaAuth();
    const accessToken = oktaAuth.getAccessToken();
    const principle = authState.idToken.claims.preferred_username;
    const principleId = authState.idToken.claims.sub;
    const [inMessage, setInMessage] = useState({
        sender: '',
        to: '',
        text: ''
      });

    function stompSubscribe(stompClient, endpoint, callback) {
        console.log(endpoint);
        stompClient.subscribe(endpoint, callback)
        return stompClient
    }

    function stompClientSendMessage(stompClient, endpoint, message) {
        stompClient.send(endpoint, {}, message)
        return stompClient
    }

    function connect(username) {
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(`ws://localhost:8080/chat`);
            const stompClient = Stomp.over(ws);
            stompClient.connect({ "X-Authorization": "Bearer " + accessToken }, (frame) => {
                resolve(stompClient);
                // setClient(stompClient);
                console.log('Connected: ' + frame);
            })
        })
    }

    useEffect(() => {
        let chatUsersList = [];
        connect(principle)
            // Endpoint listens to get the Set of connected users (only sends to user bc it is a queue)
            .then((stompClient) => stompSubscribe(stompClient, '/user/queue/newMember', (data) => {
                chatUsersList = JSON.parse(data.body)
                console.log(chatUsersList);
                    setUserList(chatUsersList)
            })).then((stompClient) => stompSubscribe(stompClient, '/topic/newMember', (data) => {
                console.log(data.body);
                setUserList(users => [
                    ...users,
                    data.body
                ])
            })).then((stompClient) => stompClientSendMessage(stompClient, '/app/register', principle))
            .then((stompClient) => stompSubscribe(stompClient, `/user/${principle}/msg`, (data) => {
                console.log(JSON.parse(data.body));
                setInMessage(JSON.parse(data.body))
            }))
            .then((stompClient) => {
                return stompClient;
            }).then((stompClient) => stompSubscribe(stompClient, '/topic/disconnectedUser', (data) => {
                const userWhoLeft = data.body;
                // chatUsersList = chatUsersList.filter(x => x != userWhoLeft);
                setUserList(userList.filter(x => x != userWhoLeft));
                alert(`User [${userWhoLeft}] left the chat room!!!`, "bg-success")
            }))
            
        }, []);
        
        
        return (
            <>
            <Card>
                <Card.Header>
                    <h4>Currently Online</h4>
                </Card.Header>
                <Card.Body>
                    {userList && userList.map((student, index) => (
                        // <Toast onClick={() => goToStudent(student.id)} key={index}>
                        <Toast key={index}>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">{student}</strong>
                            </Toast.Header>
                        </Toast>
                    ))}
                </Card.Body>
            </Card>
            <Messages client={client} userList={userList} inMessage={inMessage}/>
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