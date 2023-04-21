import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Toast } from "react-bootstrap";
import { useSocket } from '../../util/context/WebSocketContext';

export default function DisplayMessages({ sendTo }) {
  const { oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const [inMessage, setInMessage] = useState({});
  const { principle } = useSocket();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([...messages, inMessage])
  }, [inMessage]);

  useEffect(scrollToBottom, [messages.length]);

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
    </Container>
  );
}