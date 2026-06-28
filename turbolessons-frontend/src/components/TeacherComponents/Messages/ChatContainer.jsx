import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DisplayMessages from './DisplayMessages';
import SendMessage from './SendMessage';
import SelectStudent from './SelectStudent';
import { selectSelectedStudent } from './TeacherMessageSlice';

const ChatContainer = () => {
    const sendTo = useSelector(selectSelectedStudent);
    return (
        <Card>
            <Card.Body>
                <SelectStudent />
                <DisplayMessages sendTo={sendTo} />
                <SendMessage sendTo={sendTo} />
            </Card.Body>
        </Card>
    );
};

export default ChatContainer;
