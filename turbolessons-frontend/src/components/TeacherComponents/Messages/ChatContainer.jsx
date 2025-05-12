import React from 'react';
import { Card } from 'react-bootstrap';
import DisplayMessages from './DisplayMessages';
import SendMessage from './SendMessage';
import SelectStudent from './SelectStudent';

const ChatContainer = () => {
    return (
        <Card>
            <Card.Body>
                <SelectStudent />
                <DisplayMessages />
                <SendMessage />
            </Card.Body>
        </Card>
    );
};

export default ChatContainer;