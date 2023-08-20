import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
const WebSocketContext = createContext(null);

export function useSocket() {
  return useContext(WebSocketContext);
}

export const WebSocketProvider = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const principle = authState && authState.idToken && authState.idToken.claims.name;
  const claims = authState && authState.idToken && authState.idToken.claims;
  console.log(claims);
  const [inMessage, setInMessage] = useState({});
  const webSocketRef = useRef(null);

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const socket = new WebSocket(config.resourceServer.socketUri + principle);
      webSocketRef.current = socket;
      socket.addEventListener('message', function (event) {
        console.log("WebSocket message:", event);
        // setInMessage(event.data)
        setInMessage( JSON.parse(event.data));
      });
      socket.addEventListener("open", function (event) {
        console.log("WebSocket connection opened:", event);
      });

      socket.addEventListener("close", function (event) {
        if (event.wasClean) {
          console.log("WebSocket connection closed cleanly:", event);
        } else {
          console.error("WebSocket connection died:", event);
        }
      });
      
      socket.addEventListener("error", function (event) {
        console.error("WebSocket error:", event);
      });
      return () => {
        socket.close();
      }
    }
  }, [authState]);

  useEffect(() => {
    if (webSocketRef.current && authState && authState.isAuthenticated) {
      // const interval = setInterval(() => {
        if (webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.send('ping');
        }
      // }, 10000); 
  
      // return () => clearInterval(interval);
    }
  }, []);
  

  const disconnect = () => webSocketRef.current.close();

  return (
    <WebSocketContext.Provider value={{
      principle,
      inMessage,
      disconnect
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}