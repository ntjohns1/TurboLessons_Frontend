import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch } from 'react-redux';
import { teacherStore } from '../app/teacherStore';
import { studentStore } from '../app/studentStore';

// This component doesn't render anything visible
// It just handles the store switching logic based on user role
const RoleBasedStoreSelector = () => {
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      const userGroups = authState.accessToken?.claims?.groups || [];
      console.log('User groups for store selection:', userGroups);
      
      // Determine which store to use based on user role
      if (userGroups.includes('Student') && 
          !userGroups.includes('Teacher') && 
          !userGroups.includes('Admin')) {
        // Replace the current store with the student store
        // This is a workaround since we can't actually switch Redux stores at runtime
        // Instead, we'll initialize the student store reducers
        
        // Get all the reducers from the student store
        const studentReducers = studentStore.getState();
        
        // Dispatch actions to initialize the current store with student data
        Object.keys(studentReducers).forEach(reducerKey => {
          if (studentReducers[reducerKey]) {
            // Initialize each reducer with its initial state from the student store
            dispatch({ 
              type: `${reducerKey}/initialize`, 
              payload: studentReducers[reducerKey] 
            });
          }
        });
        
        console.log('Initialized student store data');
      }
    }
  }, [authState, dispatch]);

  // This component doesn't render anything
  return null;
};

export default RoleBasedStoreSelector;
