import { createSlice } from "@reduxjs/toolkit";
import { Status } from '../../enum/EnumStatus';
import { fetchLogin, fetchRegister, fetchAuth, fetchGetProfile, fetchUploadPhoto } from "./asyncActions";
import { LoginState, LoginPayloadParams, ProfilePayloadParams } from "./types";


const initialState: LoginState = {
    data: {} as LoginPayloadParams,
    error: [],
    profile: {} as ProfilePayloadParams,
    urlPhoto: '',
    uploadPhotoStatus: Status.LOADING,
    profileStatus: Status.LOADING,
    statusLogin: Status.LOADING,
    statusAuth: Status.LOADING,
    statusRegister: Status.LOADING,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = {} as LoginPayloadParams;
        },
    },
    // fetchLogin builder
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.statusLogin = Status.LOADING;
            state.data = {} as LoginPayloadParams;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.statusLogin = Status.SUCCESS;
            state.data = action.payload;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.statusLogin = Status.ERROR;
            state.data = {} as LoginPayloadParams;
            state.error = action.payload ? action.payload : [];
        });

        // fetchRegister builder
        builder.addCase(fetchRegister.pending, (state) => {
            state.statusRegister = Status.LOADING;
            state.data = {} as LoginPayloadParams;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.statusRegister = Status.SUCCESS;
            state.data = action.payload;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.statusRegister = Status.ERROR;
            state.data = {} as LoginPayloadParams;
            state.error = action.payload ? action.payload: [];
        });

        // fetchAuth builder
        builder.addCase(fetchAuth.pending, (state) => {
            state.statusAuth = Status.LOADING;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.statusAuth = Status.SUCCESS;
            state.data = action.payload;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.statusAuth = Status.ERROR;
        });

        // fetchGetProfile builder
        builder.addCase(fetchGetProfile.pending, (state) => {
            state.profileStatus = Status.LOADING;
        });
        builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
            state.profileStatus = Status.SUCCESS;
            state.profile = action.payload;
        });
        builder.addCase(fetchGetProfile.rejected, (state) => {
            state.profileStatus = Status.ERROR;
        });

        // fetchUpload builder
        builder.addCase(fetchUploadPhoto.pending, (state) => {
            state.uploadPhotoStatus = Status.LOADING;
        });
        builder.addCase(fetchUploadPhoto.fulfilled, (state, action) => {
            state.uploadPhotoStatus = Status.SUCCESS;
            state.urlPhoto = action.payload;
        });
        builder.addCase(fetchUploadPhoto.rejected, (state) => {
            state.uploadPhotoStatus = Status.ERROR;
        });
        },
})

export const { logout } = loginSlice.actions

export default loginSlice.reducer