import React from 'react';
import { Alert } from 'react-bootstrap';

export const ErrorState = ({ error, title = "Error" }) => {
  // Extract error message safely
  const getErrorMessage = () => {
    if (!error) return "An unexpected error occurred";
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return "An unexpected error occurred";
  };

  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <Alert variant="danger" className="w-100" style={{ maxWidth: '600px' }}>
        <Alert.Heading>{title}</Alert.Heading>
        <p className="mb-0">
          {getErrorMessage()}
        </p>
      </Alert>
    </div>
  );
};

export default ErrorState;
