import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Button, Form, Container, Toast } from "react-bootstrap";
import { useSocket } from '../../../util/context/WebSocketContext';
import { sendMessage } from '../../../util/api/messageServerCalls';
// import DisplayMessages from './DisplayMessages';

export default function SendMessage({ sendTo, setUpdateOutMessages }) {
  const { oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const { principle } = useSocket();
  const [outMessage, setOutMessage] = useState({
    sender: principle,
    receiver: sendTo ? sendTo : '',
    msg: ''
  });

  useEffect(() => {
    setOutMessage((prevOutMessage) => ({
      ...prevOutMessage,
      receiver: sendTo,
    }));
  }, [sendTo]);
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // error handling to check if recipient or sendTo is null
    if (!sendTo) {
      console.log('Error: sendTo is null or empty');
      return;
    }
    if (!outMessage.msg.trim()) {
      console.log('Error: msg is blank or empty');
      return;
    }
    const newTimestamp = new Date().toISOString().replace("T", " ").replace("Z", "");
    const newOutMessage = { ...outMessage, timestamp: newTimestamp };
    sendMessage(sendTo, newOutMessage, accessToken);
    setUpdateOutMessages(newOutMessage);
    setOutMessage({
      ...outMessage,
      msg: ''
    });
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setOutMessage({
      ...outMessage,
      [name]: value
    });
  }

  return (
    <Container className='my-3'>
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