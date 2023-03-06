import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { AddChatParams } from "./types";

export const fetchCreateChat = createAsyncThunk<string, AddChatParams>(
    'chat/fetchCreateChatStatus',
    async (params) => {
        console.log('sd')
        const { nameChat } = params;
            const {data} = await axios.post('/Chat/addChat', {nameChat});
            return data;
    });