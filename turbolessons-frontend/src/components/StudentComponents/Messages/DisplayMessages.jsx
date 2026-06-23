import React, { useEffect, useRef } from 'react';
import { Card, Container, Toast } from 'react-bootstrap';
import { useAuth } from '@ntjohns1/react-oidc';
import { useGetConversationQuery } from '../../../service/messagesApi';
import './DisplayMessages.css';

const DisplayMessages = ({ sendTo }) => {
  const { claims } = useAuth();
  const principle = claims.name;
  const {
    data: messages = [],
    isLoading,
    isError,
  } = useGetConversationQuery(
    { sender: principle, receiver: sendTo },
    { skip: !principle || !sendTo }
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages.length]);

  if (!sendTo) {
    return null;
  }

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  if (isError) {
    return <div>Error loading messages</div>;
  }

  return (
    <Container className="my-3">
      <Card>
        <Card.Body
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, index) => (
            <Toast
              key={msg.id ?? index}
              className={`my-3 ${msg.sender === sendTo ? "toast-right" : ""}`}
            >
              <Toast.Header closeButton={false}>
                <img className="rounded me-2" alt="" />
                <strong className="me-auto">
                  {msg.sender === principle ? principle : sendTo}
                </strong>
                <small>{msg.timestamp}</small>
              </Toast.Header>
              <Toast.Body>{msg.msg}</Toast.Body>
            </Toast>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DisplayMessages;
