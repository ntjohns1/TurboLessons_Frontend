import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const LoadingSpinner = ({ count = 3, variant = "info" }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <Spinner
        key={index}
        animation="grow"
        role="status"
        variant={variant}
        className="mx-1"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    ))}
  </>
);

export default LoadingSpinner;
