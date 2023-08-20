import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import config from '../../config';
const WebSocketContext = createContext(null);

export function useSocket() {
  return useContext(WebSocketContext);
}

export const WebSocketProvider = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const principle = authState && authState.idToken && authState.idToken.claims.name;
  const [inMessage, setInMessage] = useState({});
  const [reconnecting, setReconnecting] = useState(false);
  const webSocketRef = useRef(null);
  const maxReconnectAttempts = 3;
  const initialDelay = 2000;

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      connectSocket();
    }
    return () => {
      if (webSocketRef) {
      disconnectSocket();
      }
    }
  }, [authState]);

  const connectSocket = () => {
 
    const socket = new WebSocket(config.resourceServer.socketUri + principle);
    webSocketRef.current = socket;
    socket.addEventListener('message', function (event) {
      console.log("WebSocket message:", event);
      setInMessage(JSON.parse(event.data));
    });
    socket.addEventListener("open", function (event) {
      console.log("WebSocket connection opened:", event);
      socket.send('ping');
    });

    socket.addEventListener("close", function (event) {
      if (event.wasClean) {
        console.log("WebSocket connection closed cleanly:", event);
      } else {
        console.error("WebSocket connection died:", event);
        console.log("Attempting to reconnect WebSocket");
        setReconnecting(true);
        reconnectSocket();
      }
    });

    socket.addEventListener("error", function (event) {
      console.error("WebSocket error:", event);
    });
  }


  const reconnectSocket = (attempt = 1) => {
    if (attempt > maxReconnectAttempts) {
      console.error("Max reconnect attempts reached");
      setReconnecting(false);
      return;
    }
  
    console.log(`Reconnect attempt ${attempt}`);
  
    if (webSocketRef.current.readyState === WebSocket.CLOSED) {
      connectSocket();  
  
      setTimeout(() => {
        if (webSocketRef.current.readyState === WebSocket.CLOSED) {
          reconnectSocket(attempt + 1);
        } else {
          setReconnecting(false);
        }
      }, initialDelay * Math.pow(2, attempt - 1)); // Exponential backoff
    } else {
      setReconnecting(false);
    }
  };
  
  const disconnectSocket = () => webSocketRef.current.close();

  return (
    <WebSocketContext.Provider value={{
      principle,
      inMessage,
      disconnectSocket
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}