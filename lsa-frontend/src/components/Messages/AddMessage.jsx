import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Form, Button } from "react-bootstrap";

export default function AddMessage() {

  const { authState, oktaAuth } = useOktaAuth();
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState({
    sender: 'Nelson J.',
    senderId: '12345678',
    msg: 'Test'
  });
  const [isLoading, setIsLoading] = useState(false);

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
      body: JSON.stringify(message),
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

