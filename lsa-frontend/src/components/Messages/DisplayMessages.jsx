import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Card, Container, Toast, Row, Col } from "react-bootstrap";
import { useSocket } from '../../util/context/WebSocketContext';
import { fetchMessagesBySenderAndReceiver } from '../../util/api/messageServerCalls';


export default function DisplayMessages({ sendTo }) {
  const { authState, oktaAuth } = useOktaAuth();
  const displayName = authState && authState.idToken && authState.idToken.claims.name;
  const accessToken = oktaAuth.getAccessToken();
  const { inMessage, principle } = useSocket();
  const [outMessages, setOutMessages] = useState([]);
  const [inMessages, setInMessages] = useState([]);
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
        setOutMessages(resOutMsg);
        const resInMsg = await fetchMessagesBySenderAndReceiver(sendTo, principle, accessToken);
        setInMessages(resInMsg);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sendTo]);



  useEffect(() => {
    setOutMessages([...outMessages, inMessage])
  }, [inMessage]);

  useEffect(scrollToBottom, [outMessages.length]);

  return (
    <Container className='my-3'>
      <Card>
        <Row>
          <Col>
          <Card.Body
              style={{
                maxHeight: '200px',
                overflowY: 'auto'
              }}
            >
              {inMessages && inMessages.map((msg, index) => (
                <Toast key={index} className='my-3'>
                  <Toast.Header closeButton={false}>
                    <img
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">{sendTo}</strong>
                    <small>{msg.timestamp}</small>
                  </Toast.Header>
                  <Toast.Body>{msg.msg}</Toast.Body>
                </Toast>
              ))}
              <div ref={messagesEndRef} />
            </Card.Body>
          </Col>
          <Col>
            <Card.Body
              style={{
                maxHeight: '200px',
                overflowY: 'auto'
              }}
            >
              {outMessages && outMessages.map((msg, index) => (
                <Toast key={index} className='my-3'>
                  <Toast.Header closeButton={false}>
                    <img
                      className="rounded me-2"
                      alt=""
                    />
                    <strong className="me-auto">{displayName}</strong>
                    <small>{msg.timestamp}</small>
                  </Toast.Header>
                  <Toast.Body>{msg.msg}</Toast.Body>
                </Toast>
              ))}
              <div ref={messagesEndRef} />
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}