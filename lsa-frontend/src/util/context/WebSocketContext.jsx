import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
const WebSocketContext = createContext(null);

export function useSocket() {
  return useContext(WebSocketContext);
}

export const WebSocketProvider = ({ children }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const [chatUserList, setChatUserList] = useState([]);
  const principle = authState && authState.idToken && authState.idToken.claims.sub;
  const webSocketRef = useRef(null);
  const [inMessage, setInMessage] = useState({
    sender: '',
    to: '',
    text: ''
  });
  const headers = {
    "X-Authorization": "Bearer " + accessToken,
    "username": principle
  };

  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      console.log(principle);
      const socket = new WebSocket(`ws://localhost:8080/ws/messages?userId=${principle}`);
      webSocketRef.current = socket;
      fetch("http://localhost:8080/api/messages", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          // const res = data.map((s) => {
          //   return {
          //     id: s.id,
          //     displayName: s.profile.displayName,
          //     email: s.profile.email
          //   };
          // });
        })
        .catch((err) => {
          console.error(err);
        });
      // const socket = new WebSocket(`ws://localhost:8080/ws/messages?userId=${principle}`);

      socket.addEventListener('message', function (event) {
        console.log("WebSocket connection message:", event);
        window.alert('message from server: ' + event.data);
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
      chatUserList,
      setChatUserList,
      inMessage,
      setInMessage,
      principle
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}