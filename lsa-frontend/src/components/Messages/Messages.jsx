import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import { Button, Card, Form, Container, Toast } from "react-bootstrap";
import Stomp from 'stompjs';


// TODO: Query to find get Student's messages to teacher
// Students will only be able to send messages to the teacher, so really we'll be querying our own messages and filtering by messageAuthor

export default function Messages({ studentId, setStudentId }) {
  const [client, setClient] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const principle = authState.idToken.claims.name;
  const principleId = authState.idToken.claims.sub;
  const [message, setMessage] = useState({
    sender: principle,
    text: ''
  });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/chat');
    const stompClient = Stomp.over(ws);

    stompClient.connect({ "X-Authorization": "Bearer " + accessToken }, function (frame) {
      console.log('Connected: ' + frame);
      setClient(stompClient);
      stompClient.subscribe('/topic/messages', function (m) {
        let msg = JSON.parse(m.body);
        console.log(messages);
        setMessages(prevMessages => [
          ...prevMessages,
          { sender: msg.sender, text: msg.text, time: msg.time }
        ]);
        
      });
    });
  }, []);

  useEffect(scrollToBottom, [messages.length]);


  const sendMessage = (event, msg) => {
    event.preventDefault();
    client.send("/app/chat", {}, JSON.stringify({ 'sender': msg.sender, 'text': msg.text }));
    setMessage({
      ...message,
      text: ''
    })
  }

  const handleInput = (e) => {
    let { name, value } = e.target;

    setMessage({
      ...message,
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
      <Form onSubmit={e => sendMessage(e, message)}>
        <Form.Group id="addMessage">
          <Form.Label></Form.Label>
          <Form.Control
            as="textarea"
            name='text'
            value={message.text}
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