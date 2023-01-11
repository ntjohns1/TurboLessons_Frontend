import React, { useState, useEffect, createContext, useContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Stomp from 'stompjs';
import { useHeartbeat } from '../UseHeartbeat';
const StompContext = createContext(null);

export function useStomp() {
  return useContext(StompContext);
}

export const StompProvider = ({ children }) => {
  const [sClient, setSClient] = useState(null);
  const [session, setSession] = useState(null);
  const { authState, oktaAuth } = useOktaAuth();
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


  // window.addEventListener("beforeunload", handleWindowUnload);



  useEffect(() => {
    if (authState && authState.isAuthenticated) {

      
      // function connectStomp() {
        let stompClient;
        let tempUserList = [];
        if (authState && authState.isAuthenticated) {
          const username = authState.idToken.claims.preferred_username;
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
          // .then(() => {
            //   stompClientSendMessage(stompClient, '/app/register', username);
            //   return stompClient;
            // })
            .then(() => stompSubscribe(stompClient, '/topic/disconnectedUser', (data) => {
              const userWhoLeft = data.body;
              // chatUsersList = chatUsersList.filter(x => x != userWhoLeft);
              setChatUserList(chatUserList.filter(x => x != userWhoLeft));
              console.log(`User [${userWhoLeft}] left the chat room!!!`, "bg-success")
            }))
            .then(() => stompSubscribe(stompClient, `/user/${username}/msg`, (data) => {
              setInMessage(JSON.parse(data.body))
              setConnected(true);
            }))
            .then(() => useHeartbeat(stompClient, '/app/heartbeat', 10000))
            // Send unregister message and disconnect STOMP client when component unmounts
            // return () => {
              //   window.removeEventListener("beforeunload", this.handleWindowUnload);
              // }
            };
            
            // };
          }
        }, [authState]);
        if (authState && authState.isAuthenticated) {
          
        }
        
        
      function connect(username) {
      return new Promise((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:8080/chat');
      const stompClient = Stomp.over(ws);
      stompClient.connect({ "X-Authorization": "Bearer " + accessToken }, (frame) => {
        console.log("Stomp Connected: \n" + frame);
        resolve(stompClient);
        setSClient(stompClient);
        console.log(stompClient);
      });
    });
  }

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