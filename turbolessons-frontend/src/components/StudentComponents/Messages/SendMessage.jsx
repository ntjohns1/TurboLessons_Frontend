import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import '../../../App';
import { useOktaAuth } from '@okta/okta-react';
import { useSocket } from '../../../util/context/WebSocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, selectMessageText, setMessageText, selectSelectedUser } from './StudentMessageSlice';
import { setAccessToken } from '../../../service/axiosConfig';

export default function SendMessage() {
  const { oktaAuth } = useOktaAuth();
  const { principle } = useSocket();
  const selectedUser = useSelector(selectSelectedUser);
  const dispatch = useDispatch();
  const messageText = useSelector(selectMessageText);

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

    const newMessage = {
      sender: principle,
      receiver: selectedUser,
      msg: messageText,
      timestamp: new Date().toISOString()
    };

    const accessToken = oktaAuth.getAccessToken();
    setAccessToken(accessToken);
    dispatch(sendMessageThunk(newMessage));
    dispatch(setMessageText(''));
  };

  const handleInput = (e) => {
    dispatch(setMessageText(e.target.value));
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
          disabled={!selectedUser || !messageText.trim()}
        >
          Send
        </Button>
      </Form>
    </Container>
  );
}