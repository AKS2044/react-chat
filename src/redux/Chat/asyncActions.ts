import { createAsyncThunk } from "@reduxjs/toolkit";
import { pickBy } from "lodash";
import axios from "../../axios";
import { ChatParams, MessageParams, AddChatParams, UsersChatPayloadParams } from "./types";

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

export const fetchGetChat = createAsyncThunk<ChatParams, {chatId: number}>(
    'chat/fetchGetChatStatus',
    async (params) => {
        const {chatId} = params;
        const {data} = await axios.get<ChatParams>('/Chat/getChat', {
            params: pickBy({
                chatId
            })
        });
        return data;
    });

export const fetchDeleteMessage = createAsyncThunk<string, {messageId: number}>(
    'chat/fetchDeleteMessageStatus',
    async (params) => {
        const {messageId} = params;
        const {data} = await axios.delete('/Chat/messageDelete', {
            params: pickBy({
                messageId
            })
        });
        return data;
    });

export const fetchMessageList = createAsyncThunk<MessageParams[], {chatId: number}>(
    'chat/fetchMessageListStatus',
    async (params) => {
        const {chatId} = params;
        const {data} = await axios.get<MessageParams[]>('/Chat/mesList', {
            params: pickBy({
                chatId
            })
        });
        return data;
    });

export const fetchUsersInChat = createAsyncThunk<UsersChatPayloadParams[], {chatId: number}>(
    'chat/fetchUsersInChatStatus',
    async (params) => {
        const {chatId} = params;
        const {data} = await axios.get<UsersChatPayloadParams[]>('/Chat/usersChat', {
            params: pickBy({
                chatId
            })
        });
        return data;
    });

export const fetchSearchChat = createAsyncThunk<ChatParams[], {chatName: string}>(
    'chat/fetchSearchChatStatus',
    async (params) => {
        const {chatName} = params;
        const {data} = await axios.get<ChatParams[]>('/Chat/searchChat', {
            params: pickBy({
                chatName
            })
        });
        return data;
    });