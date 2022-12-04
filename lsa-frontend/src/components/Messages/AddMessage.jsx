import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Form, Button } from "react-bootstrap";
import config from '../../config';

export default function AddMessage({ studentId, setStudentId }) {

  const { authState, oktaAuth } = useOktaAuth();
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // Setup WebSocket
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/ws/messages');
    socket.addEventListener('message', async (event) => {
      const message = JSON.parse(event.data);
      // const request = await fetch(`http://localhost:8080/messages/${message.id}`, headers); // <3>
      // const profile = await request.json();
      // this.state.profiles.push(profile);
      // this.setState({profiles: this.state.profiles});
      console.log(event.data);
    });
  }, [])

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/api/messages";
    const accessToken = oktaAuth.getAccessToken();
    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "sender": authState.idToken.claims.name,
        "senderId": authState.idToken.claims.sub,
        "msg": inputText
      }),
    })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        }
        return Promise.reject('Didn\'t receive expected status: 201');
      })
      .then((data) => {
        console.log(data);

      })
      .then(() => goBack())
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group id="addMessage">
        <Form.Label></Form.Label>
        <Form.Control
          as="textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ height: '100px' }}
        />
      </Form.Group>
      <Button
        as='input'
        className='my-2'
        type='submit'
      />
    </Form>
  )
}

