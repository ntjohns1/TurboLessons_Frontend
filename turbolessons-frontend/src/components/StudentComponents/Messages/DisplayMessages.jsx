import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const DisplayMessages = ({ sendTo }) => {
  // Dummy message data
  const dummyMessages = [
    {
      id: 1,
      sender: 'John Smith',
      receiver: 'Current Student',
      msg: 'Hi there! How is your practice going with the new piece we discussed?',
      timestamp: '2025-05-01T14:30:00Z'
    },
    {
      id: 2,
      sender: 'Current Student',
      receiver: 'John Smith',
      msg: 'It\'s going well! I\'ve been practicing the difficult section we talked about.',
      timestamp: '2025-05-01T14:35:00Z'
    },
    {
      id: 3,
      sender: 'John Smith',
      receiver: 'Current Student',
      msg: 'Great! Remember to focus on the dynamics in measures 15-20.',
      timestamp: '2025-05-01T14:40:00Z'
    },
    {
      id: 4,
      sender: 'Sarah Johnson',
      receiver: 'Current Student',
      msg: 'Don\'t forget about our rescheduled lesson next Tuesday at 4pm!',
      timestamp: '2025-05-01T15:10:00Z'
    },
    {
      id: 5,
      sender: 'Current Student',
      receiver: 'Sarah Johnson',
      msg: 'Thanks for the reminder. I\'ve added it to my calendar.',
      timestamp: '2025-05-01T15:15:00Z'
    }
  ];

  // Filter messages based on selected teacher
  const filteredMessages = sendTo 
    ? dummyMessages.filter(msg => 
        msg.sender === sendTo || msg.receiver === sendTo
      )
    : [];

  // Format timestamp to a readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">
          {sendTo ? `Conversation with ${sendTo}` : 'Select a teacher to view messages'}
        </h5>
      </Card.Header>
      <Card.Body style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredMessages.length === 0 ? (
          <p className="text-center text-muted">
            {sendTo ? 'No messages yet. Start the conversation!' : 'Select a teacher to view messages'}
          </p>
        ) : (
          <ListGroup variant="flush">
            {filteredMessages.map((message) => (
              <ListGroup.Item 
                key={message.id}
                className={`border-bottom mb-2 ${message.sender === 'Current Student' ? 'text-end' : ''}`}
              >
                <div className={`d-inline-block p-2 rounded ${
                  message.sender === 'Current Student' 
                    ? 'bg-primary text-white' 
                    : 'bg-light'
                }`} style={{ maxWidth: '80%' }}>
                  <p className="mb-1">{message.msg}</p>
                  <small className={message.sender === 'Current Student' ? 'text-white-50' : 'text-muted'}>
                    {formatTime(message.timestamp)}
                  </small>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default DisplayMessages;
