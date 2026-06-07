import React from 'react';
import { Card } from 'react-bootstrap';

export const EmptyState = ({ message, icon = "📭" }) => (
  <div className="d-flex justify-content-center align-items-center p-5">
    <Card className="text-center" style={{ maxWidth: '400px' }}>
      <Card.Body className="p-5">
        <div style={{ fontSize: '3rem' }} className="mb-3">
          {icon}
        </div>
        <p className="text-muted mb-0">{message}</p>
      </Card.Body>
    </Card>
  </div>
);

export default EmptyState;
