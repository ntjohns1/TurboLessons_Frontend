import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureAppStore } from './store';

export const StoreProvider = ({ children }) => {
  // Start with null store to ensure we don't render until we've determined the correct store
  const [store, setStore] = useState(null);

  useEffect(() => {
    const determineUserRoleAndConfigureStore = async () => {
      try {
        console.log('Configuring store based on user role');
        
        // Try to get groups from localStorage
        let groups = [];
        const oktaTokenStorage = localStorage.getItem('okta-token-storage');
        
        if (oktaTokenStorage) {
          const tokenData = JSON.parse(oktaTokenStorage);
          if (tokenData?.idToken?.claims?.groups) {
            groups = tokenData.idToken.claims.groups;
          } else if (tokenData?.accessToken?.claims?.groups) {
            groups = tokenData.accessToken.claims.groups;
          }
        }
        
        // Determine role based on groups
        if (groups.includes('Student') && 
            !groups.includes('Teacher') && 
            !groups.includes('Admin')) {
          console.log('Configuring STUDENT store');
          setStore(configureAppStore('student'));
        } else {
          console.log('Configuring TEACHER store');
          setStore(configureAppStore('teacher'));
        }
      } catch (error) {
        console.error('Error configuring store:', error);
        // Default to teacher store on error
        setStore(configureAppStore('teacher'));
      }
    };

    determineUserRoleAndConfigureStore();
    
    // Listen for storage changes (in case user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'okta-token-storage') {
        determineUserRoleAndConfigureStore();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom login event
    const handleLoginEvent = () => {
      determineUserRoleAndConfigureStore();
    };
    
    window.addEventListener('okta-login-success', handleLoginEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('okta-login-success', handleLoginEvent);
    };
  }, []);

  // Show loading indicator until we've determined which store to use
  if (!store) {
    return <div className="text-center mt-5">Loading application...</div>;
  }

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
