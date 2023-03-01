import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { LoginParams, LoginPayloadParams, ProfilePayloadParams, RegisterParams } from "./types";



export const fetchLogin = createAsyncThunk<LoginPayloadParams, LoginParams, {rejectValue: {message: string}[]}>(
    'login/fetchLoginStatus',
    async (params, { rejectWithValue }) => {
        const { userName, password, rememberMe } = params;
        try {
            const { data } = await axios.post<LoginPayloadParams>('/User/login', {
                userName,
                password,
                rememberMe,
            });
                return data;
        }catch(err: any){
            return rejectWithValue(err.response.data)
        }
    });

export const fetchRegister = createAsyncThunk<LoginPayloadParams, RegisterParams, {rejectValue: {message: string}[]}>(
    'login/fetchRegisterStatus',
    async (params, { rejectWithValue }) => {
        const { userName, password, passwordConfirm, email, city } = params;
        try {
        const { data } = await axios.post<LoginPayloadParams>('/User/registration', {
            userName,
            password,
            passwordConfirm,
            email,
            city
        });
        return data;
    }catch(err: any){
        return rejectWithValue(err.response.data)
    }
    });

export const fetchGetProfile = createAsyncThunk<ProfilePayloadParams>(
    'login/fetchGetProfileStatus',
    async () => {
        const { data } = await axios.get<ProfilePayloadParams>('/User/profile');
        return data;
    });

export const fetchUploadPhoto = createAsyncThunk<string, FormData>(
        'login/fetchUploadPhotoStatus',
        async (formData) => {
                const {data} = await axios.post('/User/uploadPhoto', formData);
                return data;
        });

export const fetchAuth = createAsyncThunk(
    'login/fetchAuthStatus',
    async () => {
        const { data } = await axios.get<LoginPayloadParams>('/User/auth');
        return data;
    });
