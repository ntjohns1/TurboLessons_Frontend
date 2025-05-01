import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { teacherStore } from './teacherStore';
import { studentStore } from './studentStore';

// Create a simple context to track if we're inside the Okta Security component
export const StoreProvider = ({ children }) => {
  // Since we can't use useOktaAuth here (it's not available yet),
  // we'll just use the teacherStore as the default
  // The actual role-based store selection will happen in App.jsx
  return <Provider store={teacherStore}>{children}</Provider>;
};
