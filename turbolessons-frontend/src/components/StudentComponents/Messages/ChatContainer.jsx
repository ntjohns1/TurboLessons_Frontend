import React from 'react';
import { Card } from 'react-bootstrap';
import DisplayMessages from './DisplayMessages';
import SendMessage from './SendMessage';
import SelectUser from './SelectUser';

const MessageContainer = () => {
    return (
        <Card>
            <Card.Body>
                <SelectUser />
                <DisplayMessages />
                <SendMessage />
            </Card.Body>
        </Card>
    );
};

export default MessageContainer;
