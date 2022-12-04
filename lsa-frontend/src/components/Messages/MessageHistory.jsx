import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
import { Card, Toast } from "react-bootstrap";


// TODO: Query to find get Student's messages to teacher
// Students will only be able to send messages to the teacher, so really we'll be querying our own messages and filtering by messageAuthor

export default function MessageHistory({ studentId, setStudentId }) {
  const { authState, oktaAuth } = useOktaAuth();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      // TODO: Query goes here. Get messages where userId === selected userId
      const socket = new WebSocket('ws://localhost:3000/ws/messages');
      socket.addEventListener('message', async (event) => {
        const message = JSON.parse(event.data);
        // const request = await fetch(`http://localhost:8080/messages/${message.id}`, headers); // <3>
        // const profile = await request.json();
        // this.state.profiles.push(profile);
        // this.setState({profiles: this.state.profiles});
        fetch(config.resourceServer.messagesUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((response) => {
            if (!response.ok) {

              return Promise.reject();
            }
            return response.json();
          })
          .then((data) => {
            const res = data.map((msg) => {
              return {
                ...msg
              };
            });
            setMessages(res);

          })
          .catch((err) => {
            console.error(err);
          });
        console.log(event.data);
        window.alert('message from server: ' + event.data);

      });
    }
  }, [messages]);

  useEffect(scrollToBottom, [messages.length]);

  return (
    <Card>
      <Card.Header className='text-center'>Placeholder</Card.Header>
      <Card.Body
        style={{
          maxHeight: '200px',
          overflowY: 'auto'
        }}
      >
        {messages.map((message) => (
          <Toast key={message.id} className='my-3'>
            <Toast.Header closeButton={false}>
              <img
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{message.sender}</strong>
              <small>{message.timestamp}</small>
            </Toast.Header>
            <Toast.Body>{message.msg}</Toast.Body>
          </Toast>
        ))}
        <div ref={messagesEndRef} />
      </Card.Body>
    </Card>
  )
}