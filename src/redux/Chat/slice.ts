import { createSlice } from "@reduxjs/toolkit";
import { Status } from '../../enum/EnumStatus';
import { fetchAddMessageChat, fetchChatsUser, fetchCreateChat, fetchDeleteMessage, fetchGetChat, fetchMessageList } from "./asyncActions";
import { ChatParams, ChatState } from "./types";

const initialState: ChatState = {
    messages: [],
    userChats: [],
    chat: {} as ChatParams,
    statusGetMessagesChat: Status.LOADING,
    statusDeleteMessage: Status.LOADING,
    statusGetChat: Status.LOADING,
    statusUserChats: Status.LOADING,
    statusChatMes: Status.LOADING,
    statusAddChat: Status.LOADING,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
         // fetchCreateChat builder
        builder.addCase(fetchCreateChat.pending, (state) => {
            state.statusAddChat = Status.LOADING;
        });
        builder.addCase(fetchCreateChat.fulfilled, (state) => {
            state.statusAddChat = Status.SUCCESS;
        });
        builder.addCase(fetchCreateChat.rejected, (state) => {
            state.statusAddChat = Status.ERROR;
        });
        // fetchAddMessageChat builder
        builder.addCase(fetchAddMessageChat.pending, (state) => {
            state.statusChatMes = Status.LOADING;
        });
        builder.addCase(fetchAddMessageChat.fulfilled, (state) => {
            state.statusChatMes = Status.SUCCESS;
        });
        builder.addCase(fetchAddMessageChat.rejected, (state) => {
            state.statusChatMes = Status.ERROR;
        });
        // fetchChatsUser builder
        builder.addCase(fetchChatsUser.pending, (state) => {
            state.statusUserChats = Status.LOADING;
        });
        builder.addCase(fetchChatsUser.fulfilled, (state, action) => {
            state.statusUserChats = Status.SUCCESS;
            state.userChats = action.payload;
        });
        builder.addCase(fetchChatsUser.rejected, (state) => {
            state.statusUserChats = Status.ERROR;
        });
        // fetchMessageList builder
        builder.addCase(fetchMessageList.pending, (state) => {
            state.statusGetMessagesChat = Status.LOADING;
        });
        builder.addCase(fetchMessageList.fulfilled, (state, action) => {
            state.statusGetMessagesChat = Status.SUCCESS;
            state.messages = action.payload;
        });
        builder.addCase(fetchMessageList.rejected, (state) => {
            state.statusGetMessagesChat = Status.ERROR;
        });
        // fetchDeleteMessage builder
        builder.addCase(fetchDeleteMessage.pending, (state) => {
            state.statusDeleteMessage = Status.LOADING;
        });
        builder.addCase(fetchDeleteMessage.fulfilled, (state) => {
            state.statusDeleteMessage = Status.SUCCESS;
        });
        builder.addCase(fetchDeleteMessage.rejected, (state) => {
            state.statusDeleteMessage = Status.ERROR;
        });
        // fetchGetChat builder
        builder.addCase(fetchGetChat.pending, (state) => {
            state.statusGetChat = Status.LOADING;
        });
        builder.addCase(fetchGetChat.fulfilled, (state, action) => {
            state.statusGetChat = Status.SUCCESS;
            state.chat = action.payload;
        });
        builder.addCase(fetchGetChat.rejected, (state) => {
            state.statusGetChat  = Status.ERROR;
        });
        },
})

export const {  } = chatSlice.actions

export default chatSlice.reducer