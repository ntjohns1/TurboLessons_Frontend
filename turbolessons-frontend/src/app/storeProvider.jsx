import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureAppStore } from './store';

export const StoreProvider = ({ children }) => {
  // Start with null store to ensure we don't render until we've determined the correct store
  const [store, setStore] = useState(null);

  useEffect(() => {
    const determineUserRoleAndConfigureStore = () => {
      try {
        const oktaTokenStorage = localStorage.getItem('okta-token-storage');
        
        if (!oktaTokenStorage) {
          setStore(configureAppStore('teacher'));
          return;
        }

        const tokenData = JSON.parse(oktaTokenStorage);
        let groups = [];
        
        // Try to get groups from either token
        if (tokenData?.idToken?.claims?.groups) {
          groups = tokenData.idToken.claims.groups;
        } else if (tokenData?.accessToken?.claims?.groups) {
          groups = tokenData.accessToken.claims.groups;
        }
        
        // Determine role based on groups
        if (groups.includes('Student') && 
            !groups.includes('Teacher') && 
            !groups.includes('Admin')) {
          setStore(configureAppStore('student'));
        } else {
          setStore(configureAppStore('teacher'));
        }
      } catch (error) {
        setStore(configureAppStore('teacher'));
      }
    };

    determineUserRoleAndConfigureStore();
    
    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = () => {
      determineUserRoleAndConfigureStore();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Show nothing until we've determined which store to use
  if (!store) {
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
};
