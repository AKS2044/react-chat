import { Status } from "../../enum/EnumStatus";

export interface ChatState {
    message: MessageParams,
    statusChatMes: Status,
    addChat: AddChatParams,
    statusAddChat: Status,
}

export interface MessageParams {
    userName: string,
    message: string,
    dateWrite: string,
    pathPhoto: string
}

export interface AddChatParams {
    nameChat: string,
}