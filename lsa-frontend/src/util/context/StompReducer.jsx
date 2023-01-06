import { CONNECT, DISCONNECT } from './actions';

// define the reducer to handle updates to the stompClient state
export function stompClientReducer(state, action) {
  switch (action.type) {
    case CONNECT:
      return action.payload;
    case DISCONNECT:
      return null;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}