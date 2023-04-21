import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Button, Card, Form, Container, Toast } from "react-bootstrap";
import { useSocket } from '../../util/context/WebSocketContext';

export default function Messages({ sendTo }) {
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  // const principleId = authState.idToken.claims.sub;
  const { inMessage, principle } = useSocket();
  const [outMessage, setOutMessage] = useState({
    sender: principle,
    to: sendTo ? sendTo : '',
    msg: ''
  });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  useEffect(() => {
    setMessages([...messages, inMessage])
  }, [inMessage]);

  // useEffect(scrollToBottom, [messages.length]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8080/api/messages/${sendTo}`;
    const accessToken = oktaAuth.getAccessToken();
    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(outMessage),
    })
      .then(response => {
        if (response.status === 201) {
          return response;
        }
        return Promise.reject('Didn\'t receive expected status: 201');
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInput = (e) => {
    let { name, value } = e.target;

    setOutMessage({
      ...outMessage,
      [name]: value
    });

    console.log(outMessage.msg);
  }

  return (
    <Container className='my-3'>
      {/* <Card>
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
      </Card> */}
      <Form onSubmit={handleFormSubmit}>
        <Form.Group id="addMessage">
          <Form.Label></Form.Label>
          <Form.Control
            as="textarea"
            name='msg'
            value={outMessage.msg}
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