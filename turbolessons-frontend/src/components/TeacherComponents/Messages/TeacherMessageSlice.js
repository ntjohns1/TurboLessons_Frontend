import { createSlice } from "@reduxjs/toolkit";

/**
 * Client/UI state for the teacher messaging view: which student is selected,
 * the draft text, and toast feedback. Message data + realtime now live in
 * messagesApi (RTK Query) — see service/messagesApi.js.
 */
const teacherMessageSlice = createSlice({
    name: "teacherMessages",
    initialState: {
        selectedStudent: null,
        messageText: "",
        showToast: false,
        toastMessage: "",
    },
    reducers: {
        setSelectedStudent: (state, action) => {
            state.selectedStudent = action.payload;
        },
        setMessageText: (state, action) => {
            state.messageText = action.payload;
        },
        setShowToast: (state, action) => {
            state.showToast = action.payload;
        },
        setToastMessage: (state, action) => {
            state.toastMessage = action.payload;
        },
        clearMessageForm: (state) => {
            state.messageText = "";
            state.selectedStudent = null;
        },
    },
});

export const {
    setSelectedStudent,
    setMessageText,
    setShowToast,
    setToastMessage,
    clearMessageForm,
} = teacherMessageSlice.actions;

export const selectSelectedStudent = (state) => state.teacherMessages.selectedStudent;
export const selectMessageText = (state) => state.teacherMessages.messageText;
export const selectShowToast = (state) => state.teacherMessages.showToast;
export const selectToastMessage = (state) => state.teacherMessages.toastMessage;

export default teacherMessageSlice.reducer;
