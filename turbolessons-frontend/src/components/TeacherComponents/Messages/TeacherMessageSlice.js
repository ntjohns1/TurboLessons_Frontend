import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    fetchAllMessages,
    fetchMessagesByReceiver,
    fetchMessagesBySender,
    fetchMessagesBySenderAndReceiver,
    sendMessage 
} from "../../../service/messageService";

// Thunks
export const fetchAllMessagesThunk = createAsyncThunk(
    "messages/fetchAll",
    async () => {
        const response = await fetchAllMessages();
        return response;
    }
);

export const fetchMessagesByReceiverThunk = createAsyncThunk(
    "messages/fetchByReceiver",
    async (receiverId) => {
        const response = await fetchMessagesByReceiver(receiverId);
        return response;
    }
);

export const fetchMessagesBySenderThunk = createAsyncThunk(
    "messages/fetchBySender",
    async (senderId) => {
        const response = await fetchMessagesBySender(senderId);
        return response;
    }
);

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
const teacherMessageSlice = createSlice({
    name: "teacherMessages",
    initialState: {
        messages: [],
        selectedStudent: null,
        loading: false,
        error: null,
        messageText: "",
        showToast: false,
        toastMessage: ""
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
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchAllMessages cases
            .addCase(fetchAllMessagesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllMessagesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchAllMessagesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetchMessagesByReceiver cases
            .addCase(fetchMessagesByReceiverThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessagesByReceiverThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessagesByReceiverThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetchMessagesBySender cases
            .addCase(fetchMessagesBySenderThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessagesBySenderThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessagesBySenderThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
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
                state.selectedStudent = null;
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
    setSelectedStudent,
    setMessageText,
    setShowToast,
    setToastMessage,
    clearMessageForm
} = teacherMessageSlice.actions;

export const selectMessages = (state) => state.teacherMessages.messages;
export const selectSelectedStudent = (state) => state.teacherMessages.selectedStudent;
export const selectMessageText = (state) => state.teacherMessages.messageText;
export const selectShowToast = (state) => state.teacherMessages.showToast;
export const selectToastMessage = (state) => state.teacherMessages.toastMessage;
export const selectLoading = (state) => state.teacherMessages.loading;
export const selectError = (state) => state.teacherMessages.error;

export default teacherMessageSlice.reducer;