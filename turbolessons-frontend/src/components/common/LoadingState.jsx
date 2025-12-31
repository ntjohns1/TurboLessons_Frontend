import React from 'react';

export const LoadingState = ({ message = "Loading..." }) => (
  <div className="d-flex justify-content-center align-items-center p-5">
    <div className="text-center">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted">{message}</p>
    </div>
  </div>
);

export default LoadingState;
