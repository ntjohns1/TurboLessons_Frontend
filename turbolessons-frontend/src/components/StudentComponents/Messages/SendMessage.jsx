import React, { useState } from 'react';
import { Button, Form, Container } from "react-bootstrap";
import '../../../App';

export default function SendMessage({ selectedUser }) {
  // Local state for message text
  const [messageText, setMessageText] = useState('');
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedUser) {
      console.log('Error: No teacher selected');
      return;
    }
    if (!messageText.trim()) {
      console.log('Error: Message is blank or empty');
      return;
    }

    // Create dummy message object (would normally be sent to API)
    const newMessage = {
      sender: 'Current Student',
      receiver: selectedUser,
      msg: messageText,
      timestamp: new Date().toISOString()
    };

    // Log the message to console instead of sending to API
    console.log('Message would be sent:', newMessage);
    
    // Clear the message input after "sending"
    setMessageText('');
    
    // Show a success message (optional)
    alert(`Message sent to ${selectedUser}!`);
  };

  const handleInput = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <Container>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className='mb-3'>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Type your message here...'
            value={messageText}
            onChange={handleInput}
          />
        </Form.Group>
        <Button
          className='my-2'
          type='submit'
          variant='primary'
          disabled={!selectedUser}
        >
          Send
        </Button>
      </Form>
    </Container>
  );
}