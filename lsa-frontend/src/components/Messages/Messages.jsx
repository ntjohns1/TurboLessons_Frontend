import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Button, Card, Form, Container, Toast } from "react-bootstrap";
import { useStomp } from '../../util/context/StompContext';

export default function Messages({ sendTo }) {
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  
  // const principleId = authState.idToken.claims.sub;
  const { sClient, inMessage, principle } = useStomp();
  const [outMessage, setOutMessage] = useState({
    sender: principle,
    to: sendTo ? sendTo : '',
    text: ''
  });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([...messages, inMessage])
  }, [inMessage]);

  useEffect(scrollToBottom, [messages.length]);


  const sendMessage = (event, msg) => {
    event.preventDefault();
    sClient.send('/app/message', {}, JSON.stringify({ 'sender': msg.sender,'to': msg.to, 'text': msg.text }));
    setMessages([...messages, outMessage])
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
          {messages && messages.map((msg, index) => (
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