import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { selectMessageText, setMessageText } from './TeacherMessageSlice';
import useMessageData from './useMessageData';
import '../../../App';

export default function SendMessage({ sendTo }) {
  const dispatch = useDispatch();
  const messageText = useSelector(selectMessageText);
  const { send } = useMessageData(sendTo);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!sendTo) {
      console.log('Error: No student selected');
      return;
    }
    if (!messageText.trim()) {
      console.log('Error: Message is blank or empty');
      return;
    }
    try {
      await send(messageText).unwrap();
      dispatch(setMessageText(''));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInput = (e) => {
    dispatch(setMessageText(e.target.value));
  };

  return (
    <Container className='my-3'>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group id="addMessage">
          <Form.Label></Form.Label>
          <Form.Control
            as="textarea"
            name='msg'
            value={messageText}
            onChange={handleInput}
            style={{ height: '100px' }}
          />
        </Form.Group>
        <Button
          className='my-2'
          type='submit'
          variant='darkblue'
          disabled={!sendTo}
        >
          Send
        </Button>
      </Form>
    </Container>
  );
}
