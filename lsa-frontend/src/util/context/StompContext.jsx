import React, { useState, useEffect, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Stomp from 'stompjs';
const StompContext = createContext(null);

export function useStomp() {
  return useContext(StompContext);
}

export const StompProvider = ({ children }) => {
  const [sClient, setSClient] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
  const accessToken = oktaAuth.getAccessToken();
  const [chatUserList, setChatUserList] = useState([]);
  const principle = authState && authState.idToken && authState.idToken.claims.name;
  const [inMessage, setInMessage] = useState({
    sender: '',
    to: '',
    text: ''
  });
  const headers = {
    "X-Authorization": "Bearer " + accessToken,
    "username": principle
  };


  function stompSubscribe(stompClient, endpoint, callback) {
    stompClient.subscribe(endpoint, callback);
  }


  // window.addEventListener("beforeunload", handleWindowUnload);



  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      let stompClient;
      let tempUserList = [];
      const username = principle;
      connect(username)
        .then((client) => {
          stompClient = client;
          stompSubscribe(stompClient, '/user/queue/newMember', (data) => {
            console.log("/queue/newMember: \n" + data.body);
            tempUserList = JSON.parse(data.body)
            if (tempUserList.length > 0) {
              setChatUserList(tempUserList.filter(x => x != username))
            } else {
              alert("Username already exists!!!", "bg-danger")
            }
          })
        })
        .then(() => stompSubscribe(stompClient, '/topic/newMember', (data) => {
          setChatUserList(users => [
            ...users,
            data.body
          ])
          console.log("/topic/newMember: \n" + data.body);
        }))
        .then(() => stompSubscribe(stompClient, '/topic/disconnectedUser', (data) => {
          const userWhoLeft = data.body;
          setChatUserList(chatUserList.filter(x => x != userWhoLeft));
          console.log(`User [${userWhoLeft}] left the chat room!!!`, "bg-success")
        }))
        .then(() => stompSubscribe(stompClient, `/user/${username}/msg`, (data) => {
          setInMessage(JSON.parse(data.body))
        }));

      return () => {
        disconnect(sClient,principle);
      }

      // };
    }
  }, [authState]);


  function connect(username) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:8080/chat');
      const stompClient = Stomp.over(ws);

      stompClient.connect(headers, (frame) => {
        console.log("Stomp Connected: \n" + frame.body);
        resolve(stompClient);
        setSClient(stompClient);
        console.log(stompClient);
      }, errorCallback);
      stompClient.heartbeat.outgoing = 4000;
      stompClient.heartbeat.incoming = 10000;
      console.log(stompClient.body);

    });
  }

 

  var errorCallback = (error) => {
    // display the error's message header:
    console.error(error.headers.message);
  };
  function stompClientSendMessage(stompClient, endpoint, message) {
    stompClient.send(endpoint, {}, message);
  }

  function disconnect(stompClient, username) {
    stompClientSendMessage(stompClient, '/app/unregister', username)
    stompClient.disconnect()
  }

  return (
    <StompContext.Provider value={{
      sClient,
      chatUserList,
      inMessage,
      principle,
      connect,
      // connectStomp,
      disconnect,
      setChatUserList,
      setInMessage,
      stompSubscribe,
      stompClientSendMessage
    }}>
      {children}
    </StompContext.Provider>
  );
}