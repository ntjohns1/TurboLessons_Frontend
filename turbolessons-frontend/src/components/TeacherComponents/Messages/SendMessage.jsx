import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { setAccessToken } from '../../../service/axiosConfig';
import { Button, Form, Container } from "react-bootstrap";
import { useSocket } from '../../../util/context/WebSocketContext';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk, selectSelectedStudent, selectMessageText, setMessageText } from './TeacherMessageSlice';
import '../../../App';

export default function SendMessage() {
  const { oktaAuth } = useOktaAuth();
  const { principle } = useSocket();
  const dispatch = useDispatch();
  const selectedStudent = useSelector(selectSelectedStudent);
  const messageText = useSelector(selectMessageText);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedStudent) {
      console.log('Error: No student selected');
      return;
    }
    if (!messageText.trim()) {
      console.log('Error: Message is blank or empty');
      return;
    }

    const newMessage = {
      sender: principle,
      receiver: selectedStudent,
      msg: messageText,
      timestamp: new Date().toISOString()
    };

    const accessToken = oktaAuth.getAccessToken();
    setAccessToken(accessToken);
    dispatch(sendMessageThunk(newMessage));
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
          disabled={!selectedStudent}
        >
          Send
        </Button>
      </Form>
    </Container>
  );
}