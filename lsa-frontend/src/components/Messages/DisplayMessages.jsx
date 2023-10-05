import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Toast, Row, Col } from "react-bootstrap";
import { useSocket } from '../../util/context/WebSocketContext';
import { fetchMessagesBySenderAndReceiver } from '../../util/api/messageServerCalls';
import './DisplayMessages.css';
import { useStudentContext } from '../../util/context/StudentContext';

export default function DisplayMessages({ sendTo, updateOutMessages }) {
  const { authState, oktaAuth } = useOktaAuth();
  const displayName = authState && authState.idToken && authState.idToken.claims.name;
  const accessToken = oktaAuth.getAccessToken();
  const { inMessage, principle } = useSocket();
  const { students } = useStudentContext();
  const [allMessages, setAllMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!sendTo) {
        console.log('No user selected');
        return;
      }
      try {
        const resOutMsg = await fetchMessagesBySenderAndReceiver(principle, sendTo, accessToken);
        const resInMsg = await fetchMessagesBySenderAndReceiver(sendTo, principle, accessToken);
        const sortedMessages = [...resOutMsg, ...resInMsg].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setAllMessages(sortedMessages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sendTo]);

  useEffect(() => {
    if (inMessage && inMessage.sender && inMessage.sender === sendTo) {
      setAllMessages(prevMessages => [...prevMessages, inMessage]);
    }
  }, [inMessage]);

  useEffect(() => {
    if (updateOutMessages && updateOutMessages.receiver === sendTo) {
      setAllMessages(prevMessages => [...prevMessages, updateOutMessages]);
    }
  }, [updateOutMessages, sendTo]);

  useEffect(scrollToBottom, [allMessages.length]);

  const findStudentDisplayName = (id) => {
    const student = students.find((s) => s.id === id);
    console.log(student);
    return student ? student.name : '';
  };

  return (
    <Container className="my-3">
      <Card>
        <Card.Body
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {allMessages.map((msg, index) => (
            <Toast
              key={index}
              className={`my-3 ${msg.sender === sendTo ? "toast-right" : ""}`}
            >
              <Toast.Header closeButton={false}>
                <img className="rounded me-2" alt="" />
                <strong className="me-auto">
                  {msg.sender === principle ? displayName : findStudentDisplayName(sendTo)}
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
