import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Container, Card, Button } from "react-bootstrap";
import PortalNav from '../components/PortalNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStomp } from '../util/context/StompContext';

export default function Home() {
  const { authState, oktaAuth } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();
  const {
    client,
    connect,
    setInMessage,
    chatUserList,
    setChatUserList,
    stompClientSendMessage,
    stompSubscribe
  } = useStomp();
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const username = authState.idToken.claims.preferred_username;
      console.log(username);
      let stompClient;
      connect(username)
        .then((client) => {
          stompClient = client;
          stompClientSendMessage(stompClient, '/app/register', username);
          return stompClient;
        })
        .then(() => stompSubscribe(stompClient, '/user/queue/newMember', (data) => {
          setChatUserList(JSON.parse(data.body))
        }))
        .then(() => stompSubscribe(stompClient, '/topic/newMember', (data) => {
          console.log(data.body);
          setChatUserList(users => [
            ...users,
            data.body
          ])
        }))
        .then(() => stompSubscribe(stompClient, '/topic/disconnectedUser', (data) => {
          const userWhoLeft = data.body;
          // chatUsersList = chatUsersList.filter(x => x != userWhoLeft);
          setChatUserList(chatUserList.filter(x => x != userWhoLeft));
          alert(`User [${userWhoLeft}] left the chat room!!!`, "bg-success")
        }))
        .then(() => stompSubscribe(stompClient, `/user/${username}/msg`, (data) => {
          console.log(JSON.parse(data.body));
          setInMessage(JSON.parse(data.body))
        }))
    };
  }, []);

  return (
    <Container>
      {authState && authState.isAuthenticated && (
        <PortalNav />
      )}
      <Card.Body>
        <h1 className="text-center">Welcome to <FontAwesomeIcon icon={"play-circle"} /> Music Notes</h1>
        <p className="text-center">An interactive platform for music teachers and students to communicate helpful information.</p>
      </Card.Body>
      {authState && !authState.isAuthenticated && (
        <Card.Footer className='text-center'>
          <Button variant="primary" size="lg" onClick={login}>
            Login
          </Button>
        </Card.Footer>
      )}
    </Container>
  )
};