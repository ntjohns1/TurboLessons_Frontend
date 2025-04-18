import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Toast } from "react-bootstrap";
import { useSocket } from '../../../util/context/WebSocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../../../service/axiosConfig';
import {
  selectMessages,
  fetchConversationThunk,
  selectLoading,
  selectError
} from './MessageSlice';
import './DisplayMessages.css';

export default function DisplayMessages({ sendTo }) {
  const { authState } = useOktaAuth();
  const displayName = authState && authState.idToken && authState.idToken.claims.name;
  const { inMessage, principle } = useSocket();
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (sendTo && principle) {
      const accessToken = oktaAuth.getAccessToken();
      setAccessToken(accessToken);
      dispatch(fetchConversationThunk({ sender: principle, receiver: sendTo }));
    }
  }, [sendTo, principle, dispatch]);

  useEffect(() => {
    if (inMessage && inMessage.sender && inMessage.sender === sendTo) {
      const accessToken = oktaAuth.getAccessToken();
      setAccessToken(accessToken);
      dispatch(fetchConversationThunk({ sender: principle, receiver: sendTo }));
    }
  }, [inMessage, sendTo, principle, dispatch]);

  useEffect(scrollToBottom, [messages.length]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Error loading messages: {error}</div>;
  }

  const filteredMessages = messages.filter(msg =>
    (msg.sender === principle && msg.recipient === sendTo) ||
    (msg.sender === sendTo && msg.recipient === principle)
  ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <Container className="my-3">
      <Card>
        <Card.Body
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {filteredMessages.map((msg, index) => (
            <Toast
              key={index}
              className={`my-3 ${msg.sender === sendTo ? "toast-right" : ""}`}
            >
              <Toast.Header closeButton={false}>
                <img className="rounded me-2" alt="" />
                <strong className="me-auto">
                  {msg.sender === principle ? displayName : sendTo}
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
}
