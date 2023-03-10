import { createSlice } from "@reduxjs/toolkit";
import { Status } from '../../enum/EnumStatus';
import { fetchAddMessageChat, fetchChatsUser, fetchCreateChat } from "./asyncActions";
import { ChatState, MessageParams } from "./types";

const initialState: ChatState = {
    message: {} as MessageParams,
    userChats: [],
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
        },
})

export const {  } = chatSlice.actions

export default chatSlice.reducer