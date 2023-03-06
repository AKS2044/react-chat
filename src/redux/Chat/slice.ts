import { createSlice } from "@reduxjs/toolkit";
import { Status } from '../../enum/EnumStatus';
import { fetchCreateChat } from "./asyncActions";
import { ChatState, MessageParams, AddChatParams } from "./types";

const initialState: ChatState = {
    message: {} as MessageParams,
    statusChatMes: Status.LOADING,
    addChat: {} as AddChatParams,
    statusAddChat: Status.LOADING,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
    },
    // fetchCreateChat builder
    extraReducers: (builder) => {
        builder.addCase(fetchCreateChat.pending, (state) => {
            state.statusAddChat = Status.LOADING;
        });
        builder.addCase(fetchCreateChat.fulfilled, (state) => {
            state.statusAddChat = Status.SUCCESS;
        });
        builder.addCase(fetchCreateChat.rejected, (state) => {
            state.statusAddChat = Status.ERROR;
        });
        },
})

export const {  } = chatSlice.actions

export default chatSlice.reducer