// import React, { useState, useEffect, createContext, useContext } from 'react';
// import { useOktaAuth } from '@okta/okta-react';
// import Stomp from 'stompjs';

// const StompContext = createContext(null);

// export function useStomp() {
//   return useContext(StompContext);
// }

// export default function StompProvider({ children }) {
//   const [client, setClient] = useState(null);
//   const { authState, oktaAuth } = useOktaAuth();
//   const accessToken = oktaAuth.getAccessToken();
//   const [chatUserList, setChatUserList] = useState([]);
//   const principle = authState.idToken.claims.preferred_username;
//   const [inMessage, setInMessage] = useState({
//     sender: '',
//     to: '',
//     text: ''
//   });

//   function stompSubscribe(stompClient, endpoint, callback) {
//     stompClient.subscribe(endpoint, callback);
//   }

//   function stompClientSendMessage(stompClient, endpoint, message) {
//     stompClient.send(endpoint, {}, message);
//   }

//   function connect(username) {
//     return new Promise((resolve, reject) => {
//       const ws = new WebSocket('ws://localhost:8080/chat');
//       const stompClient = Stomp.over(ws);
//       stompClient.connect({ "X-Authorization": "Bearer " + accessToken }, (frame) => {
//         resolve(stompClient);
//         setClient(stompClient);
//       });
//     });
//   }

//   useEffect(() => {
//     connect(principle)
//       .then((stompClient) => {
//         stompClientSendMessage(stompClient, '/app/register', principle);
//         return stompClient;
//       })
//       .then((stompClient) => stompSubscribe(stompClient, '/user/queue/newMember', (data) => {
//         setChatUserList(JSON.parse(data.body))
//       }))
//       .then((stompClient) => stompSubscribe(stompClient, '/topic/newMember', (data) => {
//         console.log(data.body);
//         setChatUserList(users => [
//           ...users,
//           data.body
//         ])
//       }))
//       .then((stompClient) => stompSubscribe(stompClient, '/topic/disconnectedUser', (data) => {
//         const userWhoLeft = data.body;
//         // chatUsersList = chatUsersList.filter(x => x != userWhoLeft);
//         setChatUserList(chatUserList.filter(x => x != userWhoLeft));
//         alert(`User [${userWhoLeft}] left the chat room!!!`, "bg-success")
//       }))
//       .then((stompClient) => stompSubscribe(stompClient, `/user/${principle}/msg`, (data) => {
//         console.log(JSON.parse(data.body));
//         setInMessage(JSON.parse(data.body))
//       }));
//   }, []);

//   return (
//     <StompContext.Provider value={{ client, chatUserList, inMessage, stompSubscribe, stompClientSendMessage }}>
//       {children}
//     </StompContext.Provider>
//   );
// }