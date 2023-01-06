import React, { useState, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Stomp from 'stompjs';

const StompContext = createContext(null);

export function useStomp() {
  return useContext(StompContext);
}

export const StompProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  console.log(authState);
  const accessToken = oktaAuth.getAccessToken();
  const [chatUserList, setChatUserList] = useState([]);
  const principle = authState && authState.idToken && authState.idToken.claims.preferred_username;
  const [inMessage, setInMessage] = useState({
    sender: '',
    to: '',
    text: ''
  });


  function stompSubscribe(stompClient, endpoint, callback) {
    stompClient.subscribe(endpoint, callback);
  }

  function stompClientSendMessage(stompClient, endpoint, message) {
    stompClient.send(endpoint, {}, message);
  }

  function connect(username) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:8080/chat');
      const stompClient = Stomp.over(ws);
      stompClient.connect({ "X-Authorization": "Bearer " + accessToken }, (frame) => {
        resolve(stompClient);
        setClient(stompClient);
      });
    });
  }

  return (
    <StompContext.Provider value={{
      client,
      chatUserList,
      inMessage,
      principle, 
      connect,
      setChatUserList,
      setInMessage,
      stompSubscribe,
      stompClientSendMessage
    }}>
      {children}
    </StompContext.Provider>
  );
}