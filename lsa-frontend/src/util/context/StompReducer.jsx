import { ADD_USER, REMOVE_USER } from './actions.js';

export function stompClientReducer(state, action) {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                chatUserList: [...state.chatUserList, action.user]
            };
        case REMOVE_USER:
            return {
                ...state,
                chatUserList: state.chatUserList.filter(user => user !== action.user)
            };
        default:
            return state;
    }
}