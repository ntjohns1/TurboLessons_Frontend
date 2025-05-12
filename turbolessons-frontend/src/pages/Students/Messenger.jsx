import React from "react";
import { Card } from "react-bootstrap";
import ChatContainer from "../../components/StudentComponents/Messages/ChatContainer";

// Styles for equal height
const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const cardBodyStyle = {
  flex: '1 1 auto' // Makes the card body expand to fill available space
};

export default function Messenger() {
    return (
        <Card style={cardStyle}>
            <Card.Header>
                Messenger
            </Card.Header>
            <Card.Body style={cardBodyStyle}>
                <ChatContainer />
            </Card.Body>
        </Card>
    )
}