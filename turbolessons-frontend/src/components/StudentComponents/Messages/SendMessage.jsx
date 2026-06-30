import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import { useAuth } from '@ntjohns1/react-oidc';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessageText, setMessageText, selectSelectedUser } from './StudentMessageSlice';
import { useSendMessageMutation } from '../../../service/messagesApi';
import '../../../App';

export default function SendMessage() {
  const { claims } = useAuth();
  const principle = claims.name;
  const selectedUser = useSelector(selectSelectedUser);
  const messageText = useSelector(selectMessageText);
  const dispatch = useDispatch();
  const [sendMessage] = useSendMessageMutation();

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
    try {
      await sendMessage({
        sendTo: selectedUser,
        message: {
          sender: principle,
          receiver: selectedUser,
          msg: messageText,
          timestamp: new Date().toISOString(),
        },
      }).unwrap();
      dispatch(setMessageText(''));
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
