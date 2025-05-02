import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMessagesBySenderAndReceiver, sendMessage } from "../../../service/messageService";

// Thunks
export const fetchConversationThunk = createAsyncThunk(
    "messages/fetchConversation",
    async ({ sender, receiver }) => {
        const response = await fetchMessagesBySenderAndReceiver(sender, receiver);
        return response;
    }
);

export const sendMessageThunk = createAsyncThunk(
    "messages/sendMessage",
    async ({ sendTo, message }) => {
        const response = await sendMessage(sendTo, message);
        return response;
    }
);

// Slice
const studentMessageSlice = createSlice({
    name: "studentMessages",
    initialState: {
        messages: [],
        loading: false,
        selectedUser: null,
        error: null,
        messageText: "",
        showToast: false,
        toastMessage: ""
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
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchConversation cases
            .addCase(fetchConversationThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchConversationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // sendMessage cases
            .addCase(sendMessageThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMessageThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.messages.push(action.payload);
                state.messageText = "";
                state.showToast = true;
                state.toastMessage = "Message sent successfully!";
            })
            .addCase(sendMessageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.showToast = true;
                state.toastMessage = "Failed to send message.";
            });
    },
});

export const {
    setMessageText,
    setShowToast,
    setToastMessage,
    clearMessageForm,
    setSelectedUser
} = studentMessageSlice.actions;

export const selectMessages = (state) => state.studentMessages.messages;
export const selectMessageText = (state) => state.studentMessages.messageText;
// export const selectSelectedUser = (state) => state.studentMessages.selectedUser;
export const selectShowToast = (state) => state.studentMessages.showToast;
export const selectToastMessage = (state) => state.studentMessages.toastMessage;
export const selectLoading = (state) => state.studentMessages.loading;
export const selectError = (state) => state.studentMessages.error;

export default studentMessageSlice.reducer;