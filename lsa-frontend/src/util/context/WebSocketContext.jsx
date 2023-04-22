import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
const WebSocketContext = createContext(null);

export function useSocket() {
  return useContext(WebSocketContext);
}

export const WebSocketProvider = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const principle = authState && authState.idToken && authState.idToken.claims.sub;
  const [inMessage, setInMessage] = useState({});
  const webSocketRef = useRef(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const socket = new WebSocket(`ws://localhost:8080/ws/messages?userId=${principle}`);
      socket.addEventListener('message', function (event) {
        console.log("WebSocket message:", event);
        // window.alert('message from server: ' + event.data);
        const res = 
        setInMessage
      });
      socket.addEventListener("open", function (event) {
        console.log("WebSocket connection opened:", event);
      });

      socket.addEventListener("close", function (event) {
        console.log("WebSocket connection closed:", event);
      });

      socket.addEventListener("error", function (event) {
        console.error("WebSocket error:", event);
      });
      return () => {
        socket.close();
      }
    }
  }, [authState]);

  return (
    <WebSocketContext.Provider value={{
      principle,
      inMessage
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}