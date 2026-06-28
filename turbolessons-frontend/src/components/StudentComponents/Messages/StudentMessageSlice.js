import { createSlice } from "@reduxjs/toolkit";

/**
 * Client/UI state for the student messaging view: which teacher is selected,
 * the draft text, and toast feedback. Message data + realtime now live in
 * messagesApi (RTK Query) — see service/messagesApi.js.
 */
const studentMessageSlice = createSlice({
    name: "studentMessages",
    initialState: {
        selectedUser: null,
        messageText: "",
        showToast: false,
        toastMessage: "",
    },
    reducers: {
        setMessageText: (state, action) => {
            state.messageText = action.payload;
        },
        setShowToast: (state, action) => {
            state.showToast = action.payload;
        },
        setToastMessage: (state, action) => {
            state.toastMessage = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearMessageForm: (state) => {
            state.messageText = "";
        },
    },
});

export const {
    setMessageText,
    setShowToast,
    setToastMessage,
    clearMessageForm,
    setSelectedUser,
} = studentMessageSlice.actions;

export const selectMessageText = (state) => state.studentMessages.messageText;
export const selectSelectedUser = (state) => state.studentMessages.selectedUser;
export const selectShowToast = (state) => state.studentMessages.showToast;
export const selectToastMessage = (state) => state.studentMessages.toastMessage;

export default studentMessageSlice.reducer;
