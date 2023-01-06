import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Card, Button } from "react-bootstrap";
import PortalNav from '../components/PortalNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStomp } from '../util/context/StompContext';
export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();
  const loggedStatus = oktaAuth.isAuthenticated();
  const login = async () => oktaAuth.signInWithRedirect();
  const { connect, principle, setInMessage, chatUserList, setChatUserList, stompClientSendMessage, stompSubscribe } = useStomp();
  useEffect(() => {
    console.log(principle);
    connect(principle)
        .then((stompClient) => {
            stompClientSendMessage(stompClient, '/app/register', principle);
            return stompClient;
        })
        .then((stompClient) => stompSubscribe(stompClient, '/user/queue/newMember', (data) => {
            setChatUserList(JSON.parse(data.body))
        }))
        .then((stompClient) => stompSubscribe(stompClient, '/topic/newMember', (data) => {
            console.log(data.body);
            setChatUserList(users => [
                ...users,
                data.body
            ])
        }))
        .then((stompClient) => stompSubscribe(stompClient, '/topic/disconnectedUser', (data) => {
            const userWhoLeft = data.body;
            // chatUsersList = chatUsersList.filter(x => x != userWhoLeft);
            setChatUserList(chatUserList.filter(x => x != userWhoLeft));
            alert(`User [${userWhoLeft}] left the chat room!!!`, "bg-success")
        }))
        .then((stompClient) => stompSubscribe(stompClient, `/user/${principle}/msg`, (data) => {
            console.log(JSON.parse(data.body));
            setInMessage(JSON.parse(data.body))
        }));
}, []);
  return (
    <Container>
      {loggedStatus && (
        <PortalNav />
      )}
      <Card.Body>
        <h1 className="text-center">Welcome to <FontAwesomeIcon icon={"play-circle"} /> Music Notes</h1>
        <p className="text-center">An interactive platform for music teachers and students to communicate helpful information.</p>
        {!loggedStatus && (
          <Button variant="primary" size="lg" onClick={login}>
            Login
          </Button>
        )}
      </Card.Body>
    </Container>
  )
};