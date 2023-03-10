import { createAsyncThunk } from "@reduxjs/toolkit";
import pickBy from "lodash.pickby";
import axios from "../../axios";
import { ChatParams, MessageParams, AddChatParams } from "./types";

export const fetchCreateChat = createAsyncThunk<string, AddChatParams>(
    'chat/fetchCreateChatStatus',
    async (params) => {
        const {data} = await axios.post('/Chat/addChat', params);
        return data;
    });

export const fetchAddMessageChat = createAsyncThunk<string, MessageParams>(
    'chat/fetchAddMessageChatStatus',
    async (params) => {
        const {data} = await axios.post('/Chat/message', params);
        return data;
    });

export const fetchChatsUser = createAsyncThunk<ChatParams[]>(
    'chat/fetchChatsUserStatus',
    async () => {
        const {data} = await axios.get<ChatParams[]>('/Chat/chatsUser');
        return data;
    });