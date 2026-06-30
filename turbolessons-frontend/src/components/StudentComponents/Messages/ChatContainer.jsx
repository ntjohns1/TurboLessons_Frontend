import React from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DisplayMessages from './DisplayMessages';
import SendMessage from './SendMessage';
import SelectUser from './SelectUser';
import { selectSelectedUser } from './StudentMessageSlice';

const ChatContainer = () => {
    const sendTo = useSelector(selectSelectedUser);
    return (
        <Card>
            <Card.Body>
                <SelectUser />
                <DisplayMessages sendTo={sendTo} />
                <SendMessage />
            </Card.Body>
        </Card>
    );
};

export default ChatContainer;
