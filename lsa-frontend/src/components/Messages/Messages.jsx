import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import { Button, Card, Form, Container, Toast } from "react-bootstrap";
import Stomp from 'stompjs';


// TODO: Query to find get Student's messages to teacher
// Students will only be able to send messages to the teacher, so really we'll be querying our own messages and filtering by messageAuthor

export default function Messages({ client, chatUserList, inMessage }) {
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const principle = authState.idToken.claims.name;
  const principleId = authState.idToken.claims.sub;
  const [outMessage, setOutMessage] = useState({
    sender: 'nelsontjohns@gmail.com',
    to: 'nelsontjohns@gmail.com',
    text: ''
  });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages.length]);


  const sendMessage = (event, msg) => {
    event.preventDefault();
    client.send(`/app/chat/${msg.to}`, {}, JSON.stringify({ 'sender': msg.sender,'to': msg.to, 'text': msg.text }));
    setOutMessage({
      ...outMessage,
      text: ''
    })
  }

  const handleInput = (e) => {
    let { name, value } = e.target;

    setOutMessage({
      ...outMessage,
      [name]: value
    });
  }

  return (
    <Container className='my-3'>
      <Card>
        <Card.Body
          style={{
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {messages.map((msg, index) => (
            <Toast key={index} className='my-3'>
              <Toast.Header closeButton={false}>
                <img
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{msg.sender}</strong>
                <small>{msg.time}</small>
              </Toast.Header>
              <Toast.Body>{msg.text}</Toast.Body>
            </Toast>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
      </Card>
      <Form onSubmit={e => sendMessage(e, outMessage)}>
        <Form.Group id="addMessage">
          <Form.Label></Form.Label>
          <Form.Control
            as="textarea"
            name='text'
            value={outMessage.text}
            onChange={handleInput}
            style={{ height: '100px' }}
          />
        </Form.Group>
        <Button
          className='my-2'
          type='submit'
        >
          Send
        </Button>
      </Form>
    </Container>
  );
}