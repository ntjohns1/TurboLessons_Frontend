import React from 'react';
import ErrorState from './ErrorState';

export const UnauthorizedState = ({
  message = "An Authorization Error Has Occurred. Please Try Again or Contact an Admin.",
}) => (
  <ErrorState error={message} title="Unauthorized" />
);

export default UnauthorizedState;
