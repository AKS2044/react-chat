import { Status } from '../../enum/EnumStatus';

export interface LoginState {
    data: LoginPayloadParams,
    error: {message: string}[],
    profile: ProfilePayloadParams,
    profileStatus: Status,
    urlPhoto: string,
    uploadPhotoStatus: Status,
    statusLogin: Status,
    statusAuth: Status,
    statusRegister: Status,
}

export interface LoginParams {
    userName: string,
    password: string,
    rememberMe: boolean,
}

export interface ProfilePayloadParams {
    email: string,
    city: string,
    userName: string,
    dateReg: string,
    roles: string[],
    watchLater: number,
    favourite: number,
    pathPhoto: string,
    photoName: string,
}

export interface RegisterParams {
    email: string,
    city: string,
    userName: string,
    password: string,
    passwordConfirm: string,
    pathPhoto?: string,
    photoName?: string,
}

export interface LoginPayloadParams {
    id: string,
    email: string,
    roles: string[],
    token: boolean,
    userName: string,
    pathPhoto: string
}

export interface GetProfileParams {
    userName: string
}